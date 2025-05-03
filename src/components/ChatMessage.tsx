import { useState, useRef } from "react";
import jsPDF from "jspdf";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageType = "user" | "assistant";
export type MessageContent = {
  text?: string;
  imageUrl?: string;
};

interface ChatMessageProps {
  message: string | MessageContent;
  type: MessageType;
  timestamp: Date;
}

const ChatMessage = ({ message, type, timestamp }: ChatMessageProps) => {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);
  
  // Convert message to standard format
  const messageContent = typeof message === "string" ? { text: message } : message;
  
  const isUser = type === "user";
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  const messageRef = useRef<HTMLDivElement>(null);

  // Helper: naive check if this is a lesson plan (customize as needed)
  const isLessonPlan = messageContent.text && (
    messageContent.text.toLowerCase().includes("learning objectives") ||
    messageContent.text.toLowerCase().includes("lesson steps") ||
    messageContent.text.toLowerCase().includes("assessment questions")
  );

  const handleDownloadPDF = () => {
    if (!messageRef.current) return;
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
      margin: 72
    });
    const margin = 72;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    // Extract lesson title (first heading or first line)
    let lessonTitle = "Lesson Plan";
    let lines: string[] = [];
    if (messageRef.current) {
      const html = messageRef.current.innerHTML;
      lines = html.replace(/<br\s*\/?>(\s*)/gi, '\n').replace(/<[^>]+>/g, '').split(/\n|\r/).map(l => l.trim()).filter(Boolean);
      if (lines.length > 0) {
        // Use the first non-empty line as the lesson title
        lessonTitle = lines[0];
      }
    }
    // Summarize lesson title to max 4 words for filename
    const summarizedTitle = lessonTitle.split(/\s+/).slice(0, 4).join('_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();

    // Header: Mothers Of Mathematics
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(80, 36, 120); // purple
    doc.text('Mothers Of Mathematics', pageWidth / 2, y, { align: 'center' });
    y += 32;

    // Lesson Title
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text(lessonTitle, pageWidth / 2, y, { align: 'center', maxWidth: pageWidth - 2 * margin });
    y += 26;

    // Subtitle
    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('- mothers of mathematics -', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Decorative line
    doc.setDrawColor(80, 36, 120);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;

    // Body: parse and style
    function addText(text, fontSize, fontStyle = 'normal', spacing = 12) {
      doc.setFont('times', fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(40, 40, 40);
      // Split long text into lines to fit the page
      const splitLines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      splitLines.forEach(line => {
        doc.text(line, margin, y, { align: 'left' });
        y += fontSize + 2;
      });
      y += spacing - 2;
    }
    if (lines.length > 0) {
      lines.forEach((line, idx) => {
        if (idx === 0) return; // skip title, already used
        if (/^(learning objectives|objectives)/i.test(line)) {
          addText(line, 14, 'bold', 8);
        } else if (/^(materials|materials needed|lesson steps|steps|assessment|assessment questions|conclusion|introduction|practice|development)/i.test(line)) {
          addText(line, 13, 'bold', 6);
        } else if (/^---+$/.test(line)) {
          // skip horizontal rules
        } else {
          addText(line, 11, 'normal', 4);
        }
      });
    }
    doc.save(`${summarizedTitle || 'lesson_plan'}-mothers_of_mathematics.pdf`);
  };

  const handleFeedback = (value: "like" | "dislike") => {
    setFeedback(value);
    // Here you could send the feedback to your API
    console.log(`Feedback for message: ${value}`);
  };
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <Card className={cn(
          "p-4",
          isUser 
            ? "bg-gradient-mama text-mama-purple" // User message: purple text
            : "chat-message-container bg-white"
        )}>
          <div ref={messageRef}>
            {messageContent.text && (
              <div className="whitespace-pre-wrap mb-2">{messageContent.text}</div>
            )}
            {messageContent.imageUrl && (
              <div className="mt-2">
                <img 
                  src={messageContent.imageUrl} 
                  alt="Uploaded content"
                  className="max-w-full rounded-md" 
                />
              </div>
            )}
          </div>
          {/* Show download button if this is a lesson plan and from assistant */}
          {isLessonPlan && !isUser && (
            <button
              onClick={handleDownloadPDF}
              className="bg-mama-purple text-white px-4 py-2 rounded hover:bg-mama-purple/80 mt-2 w-full"
            >
              Download this lesson as PDF
            </button>
          )}
          <div className={cn(
            "text-xs mt-2 flex items-center",
            isUser ? "justify-end text-white/80" : "justify-between text-muted-foreground"
          )}>
            <span>{formattedTime}</span>
            
            {!isUser && (
              <div className="flex space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 h-6 w-6 rounded-full ${feedback === 'like' ? 'bg-green-100 text-green-600' : ''}`}
                  onClick={() => handleFeedback("like")}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 h-6 w-6 rounded-full ${feedback === 'dislike' ? 'bg-red-100 text-red-600' : ''}`}
                  onClick={() => handleFeedback("dislike")}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
