import { FishIcon as Whale } from "lucide-react";

export default function ChatMessages() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <Whale className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Hi, I'm your therapist.</h2>
      <p className="text-muted-foreground">How can I help you today?</p>
    </div>
  );
}
