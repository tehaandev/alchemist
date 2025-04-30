"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AI_MODELS } from "@/constants";
import { AIModel } from "@/features/open-ai/open-ai.type";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  className?: string;
}

export function ModelSelector({
  onModelChange,
  className,
  selectedModel,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);

  // Initialize the selected model
  useEffect(() => {
    const storedModelId = localStorage.getItem("selectedModel");
    if (storedModelId) {
      const storedModel = AI_MODELS.find((model) => model.id === storedModelId);
      if (storedModel) {
        onModelChange(storedModel);
      }
    }
  }, [onModelChange]);

  const handleSelectModel = (model: AIModel) => {
    if (!model.isAvailable) {
      toast.error("This model is not available.");
      return;
    }
    onModelChange(model);
    localStorage.setItem("selectedModel", model.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-1/3 justify-between", className)}>
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="text-primary h-4 w-4" />
            <span className="truncate">{selectedModel?.name}</span>
            <span className="text-muted-foreground ml-1 truncate text-xs">
              ({selectedModel?.provider})
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {AI_MODELS.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.id}
                  onSelect={() => handleSelectModel(model)}
                  disabled={!model.isAvailable}
                  className={
                    !model.isAvailable ? "cursor-not-allowed opacity-50" : ""
                  }>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedModel?.id === model.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span>{model.name}</span>
                      <span className="text-muted-foreground ml-1 text-xs">
                        ({model.provider})
                      </span>
                    </div>
                    {model.description && (
                      <span className="text-muted-foreground text-xs">
                        {model.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
