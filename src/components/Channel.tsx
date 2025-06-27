// src/components/Channel.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Youtube, Check, Loader2, Sparkles } from "lucide-react";
import gsap from "gsap";

import { Button } from "./sub_components/Button";
import { Input } from "./sub_components/input";
import { ScrollArea } from "./sub_components/ScrollArea";
import { Separator } from "./sub_components/Seperator";

import "../Css/Channel.css";

type SearchState = "idle" | "loading" | "success" | "error" | "no-results";

export interface ChannelProps {
  onBack: () => void;
}

const Channel: React.FC<ChannelProps> = ({ onBack }) => {
  // --- 1. State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [channelResults, setChannelResults] = useState<
    Array<{
      id: string;
      name: string;
      subscribers: string;
      avatar: string;
      handle?: string;
    }>
  >([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );
  const [showResultCount, setShowResultCount] = useState(false);
  const [videoCount, setVideoCount] = useState(1);

  const minVideos = 1;
  const maxVideos = 100;
  const channelListRef = useRef<HTMLDivElement>(null);

  // --- 2. Animation ---
  useEffect(() => {
    if (!channelListRef.current) return;
    const items = channelListRef.current.querySelectorAll(".channel-item");
    if (showResultCount && channelResults.length > 1) {
      gsap.to(
        channelListRef.current.querySelectorAll(
          ".channel-item:not(.selected)"
        ),
        { opacity: 0, scale: 0.95, duration: 0, pointerEvents: "none" }
      );
    } else {
      gsap.set(items, { opacity: 1, scale: 1, clearProps: "pointerEvents" });
    }
  }, [showResultCount, selectedChannelId, channelResults.length]);

  // --- 3. Reset on Deselect ---
  useEffect(() => {
    if (selectedChannelId === null) {
      setShowResultCount(false);
      setVideoCount(minVideos);
    }
  }, [selectedChannelId]);

  const selectedChannel =
    channelResults.find((c) => c.id === selectedChannelId) || null;

  // --- 4. Format Subs ---
  const formatSubscribers = (subs: string | number) => {
    const num = typeof subs === "number" ? subs : Number(subs);
    if (isNaN(num)) return String(subs);
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  };

  // --- 5. Search ---
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSearchState("loading");
    setSelectedChannelId(null);

    chrome.runtime.sendMessage(
      { action: "FETCH_CHANNELS", query: searchQuery, maxResults: 5 },
      (response) => {
        if (chrome.runtime.lastError || !response) {
          setChannelResults([]);
          setSearchState("error");
          return;
        }
        if (response.channels?.length) {
          setChannelResults(
            response.channels.map((ch: any) => ({
              id: ch.id,
              name: ch.title,
              subscribers:
                formatSubscribers(ch.subscriberCount) + " subscribers",
              avatar: ch.iconUrl,
              handle: ch.handle,
            }))
          );
          setSearchState("success");
        } else {
          setChannelResults([]);
          setSearchState("no-results");
        }
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // --- 6. Start ---
  const startAutomation = () => {
    chrome.runtime.sendMessage({
      action: "START_AUTOMATION",
      selectedHandle: selectedChannel,
      maxResults: 5,
      count: videoCount,
    });
  };

  // --- 7. Render Content ---
  const renderContent = () => {
    switch (searchState) {
      /* idle, loading, no-results, success cases as before… */
      // (copy exactly what you had)
      default:
        return null;
    }
  };

  return (
    <div className="youtube-automation">
      {/* Back button */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="you-header">
        <div className="you-header-icon">
          <Youtube />
        </div>
        <h1 className="you-header-title">YouTube Automation</h1>
      </div>
      <Separator />
      <div className="search-section">
        <div className="search-row">
          <Input
            icon={<Search />}
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={searchState === "loading"}
          />
          <Button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || searchState === "loading"}
          >
            {searchState === "loading" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>
      <Separator />
      <div className="content-area">{renderContent()}</div>
      {selectedChannel && (
        <>
          <Separator />
          <div className="footer">
            <Button className="footer-btn" onClick={startAutomation}>
              <Sparkles /> Start Automation
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Channel;
