"use client";

import React from "react";
import {
  Terminal,
  Cpu,
  Server,
  Radio,
  Activity,
  Layers,
  Cloud,
  ShieldCheck,
  AlertTriangle,
  Boxes,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface ProjectAestheticVisualProps {
  projectId: string;
}

export function ProjectAestheticVisual({ projectId }: ProjectAestheticVisualProps) {
  if (projectId === "gpt-backend-platform") {
    return <GptBackendVisual />;
  }
  if (projectId === "cloud-video-storage") {
    return <CloudStorageVisual />;
  }
  if (projectId === "quick-commerce") {
    return <QuickCommerceVisual />;
  }
  if (projectId === "hackcrux") {
    return <HackCruxVisual />;
  }

  return <FallbackProjectVisual />;
}

function WindowHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]/80 text-[11px] font-mono">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E5]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E5]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E5]" />
        </div>
        <span className="text-[#666666] ml-1.5 font-medium">{title}</span>
      </div>
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F4F4F2] border border-[#E8E8E5] text-[10px] font-semibold text-[#1A1A1A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        {badge}
      </span>
    </div>
  );
}

// 1. GPT Backend Platform Visual
function GptBackendVisual() {
  return (
    <div className="relative w-full h-full rounded-xl bg-[#FAFAF8] border border-[#E8E8E5] p-4 sm:p-5 flex flex-col justify-between select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
      <WindowHeader title="gateway/chat-stream.ts" badge="200 OK • SSE" />

      <div className="my-auto py-3 flex flex-col gap-2.5">
        {/* Request Block */}
        <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-3 text-[11px] font-mono shadow-2xs">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-semibold text-[#666666]">POST /v1/chat/completions</span>
            <span className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
              <ShieldCheck size={12} /> bearer verified
            </span>
          </div>
          <p className="text-[#1A1A1A] leading-relaxed text-xs">
            <span className="text-[#888888]">&gt; prompt:</span> &quot;Synthesizing fault-tolerant distributed API gateway...&quot;
          </p>
        </div>

        {/* Streaming Response Block */}
        <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-3 text-[11px] font-mono shadow-2xs">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-semibold text-[#1A1A1A] flex items-center gap-1">
              <Zap size={12} className="text-[#10B981]" /> gpt-4o-mini stream
            </span>
            <span className="text-[10px] text-[#888888]">142 tok/s</span>
          </div>
          <p className="text-[#1A1A1A] leading-relaxed text-xs">
            <span className="text-[#10B981] font-semibold">&gt; output:</span> Cluster online. Rate-limiting Redis mutex active.
            <span className="inline-block w-1.5 h-3.5 bg-[#1A1A1A] animate-pulse align-middle ml-1" />
          </p>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="pt-3 border-t border-[#E8E8E5]/80 flex items-center justify-between text-[10px] font-mono text-[#666666]">
        <span>Latency: <strong className="text-[#1A1A1A]">38ms TTFT</strong></span>
        <span>Availability: <strong className="text-[#10B981]">99.98%</strong></span>
        <span>Cache: <strong className="text-[#1A1A1A]">Redis HIT</strong></span>
      </div>
    </div>
  );
}

// 2. Cloud Storage System Visual
function CloudStorageVisual() {
  return (
    <div className="relative w-full h-full rounded-xl bg-[#FAFAF8] border border-[#E8E8E5] p-4 sm:p-5 flex flex-col justify-between select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
      <WindowHeader title="cluster/distributed-storage.go" badge="Raft Quorum 3/3" />

      <div className="my-auto py-3 flex flex-col gap-2.5">
        {/* Storage Nodes Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-2.5 text-center shadow-2xs">
            <span className="text-[9px] font-mono font-bold text-[#10B981] block">LEADER</span>
            <span className="text-xs font-mono font-bold text-[#1A1A1A] block mt-0.5">Node-01</span>
            <span className="text-[9px] font-mono text-[#888888] block mt-0.5">S3 Shard A</span>
          </div>
          <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-2.5 text-center shadow-2xs">
            <span className="text-[9px] font-mono font-bold text-[#666666] block">FOLLOWER</span>
            <span className="text-xs font-mono font-bold text-[#1A1A1A] block mt-0.5">Node-02</span>
            <span className="text-[9px] font-mono text-[#888888] block mt-0.5">Replica 1</span>
          </div>
          <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-2.5 text-center shadow-2xs">
            <span className="text-[9px] font-mono font-bold text-[#666666] block">FOLLOWER</span>
            <span className="text-xs font-mono font-bold text-[#1A1A1A] block mt-0.5">Node-03</span>
            <span className="text-[9px] font-mono text-[#888888] block mt-0.5">Replica 2</span>
          </div>
        </div>

        {/* Chunk Streaming Telemetry */}
        <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-3 text-[11px] font-mono shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-medium text-[#1A1A1A]">HLS Transcoder: 1080p | 720p | 480p</span>
          </div>
          <span className="text-[10px] text-[#888888]">CRC32: 0x8F4E</span>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="pt-3 border-t border-[#E8E8E5]/80 flex items-center justify-between text-[10px] font-mono text-[#666666]">
        <span>Throughput: <strong className="text-[#1A1A1A]">1.2 GB/s</strong></span>
        <span>Replication: <strong className="text-[#10B981]">3x Sync</strong></span>
        <span>Durability: <strong className="text-[#1A1A1A]">99.999%</strong></span>
      </div>
    </div>
  );
}

// 3. Quick Commerce Platform Visual
function QuickCommerceVisual() {
  return (
    <div className="relative w-full h-full rounded-xl bg-[#FAFAF8] border border-[#E8E8E5] p-4 sm:p-5 flex flex-col justify-between select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
      <WindowHeader title="events/order-pipeline.ts" badge="Kafka P99: 11ms" />

      <div className="my-auto py-3 flex flex-col gap-2">
        {/* Pipeline Steps Flow */}
        <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
          <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] shadow-2xs">
            <span className="text-[9px] text-[#888888] block">Step 1</span>
            <span className="text-[10px] font-bold text-[#1A1A1A] block truncate">Checkout</span>
            <span className="text-[9px] text-[#10B981] block mt-0.5">#ord-8491</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] shadow-2xs">
            <span className="text-[9px] text-[#888888] block">Step 2</span>
            <span className="text-[10px] font-bold text-[#1A1A1A] block truncate">Kafka Event</span>
            <span className="text-[9px] text-[#666666] block mt-0.5">orders.v1</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] shadow-2xs">
            <span className="text-[9px] text-[#888888] block">Step 3</span>
            <span className="text-[10px] font-bold text-[#1A1A1A] block truncate">Redis Mutex</span>
            <span className="text-[9px] text-[#666666] block mt-0.5">SKU Locked</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] shadow-2xs">
            <span className="text-[9px] text-[#888888] block">Step 4</span>
            <span className="text-[10px] font-bold text-[#1A1A1A] block truncate">Dispatched</span>
            <span className="text-[9px] text-[#10B981] block mt-0.5">ETA 9 min</span>
          </div>
        </div>

        {/* Realtime Socket Status */}
        <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-2.5 text-[11px] font-mono shadow-2xs flex items-center justify-between">
          <span className="text-xs text-[#1A1A1A] font-medium flex items-center gap-1.5">
            <Activity size={14} className="text-[#10B981]" /> WebSockets Active
          </span>
          <span className="text-[10px] text-[#666666]">1,420 Live Sockets</span>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="pt-3 border-t border-[#E8E8E5]/80 flex items-center justify-between text-[10px] font-mono text-[#666666]">
        <span>Queue Lag: <strong className="text-[#10B981]">0 msgs</strong></span>
        <span>Catalog: <strong className="text-[#1A1A1A]">10k+ SKUs</strong></span>
        <span>Delivery SLA: <strong className="text-[#1A1A1A]">&lt; 10 mins</strong></span>
      </div>
    </div>
  );
}

// 4. HackCrux Disaster Intelligence Visual
function HackCruxVisual() {
  return (
    <div className="relative w-full h-full rounded-xl bg-[#FAFAF8] border border-[#E8E8E5] p-4 sm:p-5 flex flex-col justify-between select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
      <WindowHeader title="nlp/bert-classifier.py" badge="🏆 Winner" />

      <div className="my-auto py-3 flex flex-col gap-2.5">
        {/* Incident Alert Card */}
        <div className="rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] p-3 text-[11px] font-mono shadow-2xs">
          <div className="flex items-center justify-between text-[#888888] mb-1">
            <span className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
              <CheckCircle2 size={12} /> VERIFIED INCIDENT #2025-NX
            </span>
            <span className="text-[10px] text-[#888888]">Confidence: 99.4%</span>
          </div>
          <p className="text-[#1A1A1A] leading-relaxed text-xs">
            BERT classified: Critical emergency telemetry from multi-source stream.
          </p>
        </div>

        {/* Aggregation Stats */}
        <div className="grid grid-cols-2 gap-2 text-center font-mono">
          <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] shadow-2xs">
            <span className="text-[9px] text-[#888888] block">Raw Stream</span>
            <span className="text-xs font-bold text-[#1A1A1A]">4,180 Ingested</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E5] shadow-2xs">
            <span className="text-[9px] text-[#888888] block">Deduplicated</span>
            <span className="text-xs font-bold text-[#10B981]">32 Verified</span>
          </div>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="pt-3 border-t border-[#E8E8E5]/80 flex items-center justify-between text-[10px] font-mono text-[#666666]">
        <span>F1-Score: <strong className="text-[#10B981]">0.96</strong></span>
        <span>Categories: <strong className="text-[#1A1A1A]">12 Classes</strong></span>
        <span>Hackathon: <strong className="text-[#1A1A1A]">LNMIIT &apos;25</strong></span>
      </div>
    </div>
  );
}

// Fallback Visual
function FallbackProjectVisual() {
  return (
    <div className="relative w-full h-full rounded-xl bg-[#FAFAF8] border border-[#E8E8E5] p-5 flex flex-col justify-between select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
      <WindowHeader title="system/architecture.ts" badge="Active" />
      <div className="my-auto py-4 text-center font-mono">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-[#FFFFFF] border border-[#E8E8E5] text-[#1A1A1A] mb-2 shadow-xs">
          <Cpu size={22} />
        </div>
        <span className="text-xs font-bold text-[#1A1A1A] block">Production System Architecture</span>
        <span className="text-[10px] text-[#666666] block mt-0.5">Scalable, resilient backend infrastructure</span>
      </div>
      <div className="pt-3 border-t border-[#E8E8E5]/80 flex items-center justify-between text-[10px] font-mono text-[#666666]">
        <span>Status: <strong className="text-[#10B981]">Operational</strong></span>
        <span>Tier: <strong className="text-[#1A1A1A]">Production</strong></span>
      </div>
    </div>
  );
}
