// ============================================
// CreateCommunityModal Component
// Modal for creating new communities with AI features
// ============================================

import { Button, Input, Modal, Textarea } from "@/components/ui";
import { useCommunityDescription, useCommunityTags } from "@/hooks";
import { createCommunity } from "@/services/communities";
import { Activity, Plus, Sparkles, Tag } from "lucide-react";
import React, { useState } from "react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function CreateCommunityModal({
  isOpen,
  onClose,
  userId,
}: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  const { loading: generatingDesc, generate: generateDesc } =
    useCommunityDescription();
  const { loading: generatingTags, generate: generateTags } =
    useCommunityTags();

  const handleGenerateDescription = async () => {
    if (!name || !game) return;
    try {
      const { generateCommunityDescription } = await import(
        "@/services/gemini"
      );
      const result = await generateCommunityDescription(name, game);
      setDesc(result);
    } catch (error) {
      console.error("Failed to generate description:", error);
    }
  };

  const handleGenerateTags = async () => {
    if (!game) return;
    try {
      const { generateCommunityTags } = await import("@/services/gemini");
      const result = await generateCommunityTags(game);
      setTags(result);
    } catch (error) {
      console.error("Failed to generate tags:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !game) return;

    setCreating(true);
    try {
      await createCommunity({ name, game, description: desc, tags }, userId);
      // Reset form and close
      setName("");
      setGame("");
      setDesc("");
      setTags([]);
      onClose();
    } catch (err) {
      console.error("Error creating community:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Space"
      description="Launch a new home for your squad."
    >
      <form onSubmit={handleCreate} className="space-y-4">
        <Input
          label="Community Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Apex Predators"
        />

        <Input
          label="Primary Game"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          placeholder="e.g. Valorant, LoL, Street Fighter"
        />

        {/* Tags Generator */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-zinc-500">Tags</label>
            <button
              type="button"
              onClick={handleGenerateTags}
              disabled={!game || generatingTags}
              className="text-xs text-zinc-400 hover:text-zinc-300 flex items-center gap-1 disabled:opacity-40 transition-colors"
            >
              {generatingTags ? (
                <Activity className="w-3 h-3 animate-spin" />
              ) : (
                <Tag className="w-3 h-3" />
              )}
              Auto-Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-zinc-950 rounded-lg border border-zinc-800/50">
            {tags.length === 0 && (
              <span className="text-xs text-zinc-600">
                Tags will appear here...
              </span>
            )}
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description Generator */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-zinc-500">
              Description
            </label>
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={!name || !game || generatingDesc}
              className="text-xs text-zinc-400 hover:text-zinc-300 flex items-center gap-1 disabled:opacity-40 transition-colors"
            >
              {generatingDesc ? (
                <Activity className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              Generate
            </button>
          </div>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What is this community about?"
            className="h-24"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={creating}
            leftIcon={<Plus className="w-4 h-4" />}
            className="flex-1"
          >
            Launch
          </Button>
        </div>
      </form>
    </Modal>
  );
}
