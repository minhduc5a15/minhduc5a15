import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Folder, File, GitBranch, Tag, GitCommit } from 'lucide-react';

// Caching to prevent rate limits
const cache = new Map<string, any>();

interface GithubHoverPreviewProps {
  repo: string;
  children: React.ReactNode;
}

const timeAgo = (dateString: string) => {
  const diff = Math.floor((new Date(dateString).getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diff) < 60) return rtf.format(diff, 'second');
  if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (Math.abs(diff) < 86400)
    return rtf.format(Math.round(diff / 3600), 'hour');
  if (Math.abs(diff) < 2592000)
    return rtf.format(Math.round(diff / 86400), 'day');
  if (Math.abs(diff) < 31536000)
    return rtf.format(Math.round(diff / 2592000), 'month');
  return rtf.format(Math.round(diff / 31536000), 'year');
};

export const GithubHoverPreview: React.FC<GithubHoverPreviewProps> = ({
  repo,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState<any>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const fetchGithubData = async () => {
    if (cache.has(repo)) {
      setData(cache.get(repo));
      return;
    }

    setLoading(true);
    try {
      const [repoRes, commitsRes, contentsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${repo}`),
        fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`),
        fetch(`https://api.github.com/repos/${repo}/contents`),
      ]);

      const repoData = await repoRes.json();
      const commitsData = await commitsRes.json();
      const contentsData = await contentsRes.json();

      let files = Array.isArray(contentsData) ? contentsData : [];
      files.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'dir' ? -1 : 1;
      });

      const processedData = {
        name: repoData.name,
        ownerAvatar: repoData.owner?.avatar_url || '',
        ownerLogin: repoData.owner?.login || '',
        defaultBranch: repoData.default_branch || 'main',
        latestCommit: {
          message:
            commitsData[0]?.commit?.message?.split('\n')[0] || 'Initial commit',
          hash: commitsData[0]?.sha?.substring(0, 7) || '0000000',
          date:
            commitsData[0]?.commit?.committer?.date || new Date().toISOString(),
          author:
            commitsData[0]?.author?.login || repoData.owner?.login || 'unknown',
          authorAvatar:
            commitsData[0]?.author?.avatar_url ||
            repoData.owner?.avatar_url ||
            '',
        },
        files: files, // Render all files
      };

      cache.set(repo, processedData);
      setData(processedData);
    } catch (e) {
      console.error('Failed to fetch Github data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const estimatedHeight = 400; // Header ~150px + max-h file list 250px

      let topPos = rect.bottom + 10;

      // Check if rendering below exceeds window height
      if (topPos + estimatedHeight > window.innerHeight) {
        // Check if there is enough space above
        if (rect.top - estimatedHeight - 10 > 0) {
          topPos = rect.top - estimatedHeight - 10; // Position above
        } else {
          // Clamp to the bottom edge if space is insufficient on both sides
          topPos = window.innerHeight - estimatedHeight - 20;
        }
      }

      setCoords({
        top: Math.max(20, topPos), // Ensure it never overflows the top edge
        left: rect.left,
      });
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
      fetchGithubData();
    }, 400); // 400ms delay before showing tooltip
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 300); // give user time to move mouse into tooltip
  };

  return (
    <span
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}
      {isHovered &&
        createPortal(
          <div
            className="fixed z-[9999] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl w-[550px] max-w-[95vw] overflow-hidden text-slate-300 font-mono text-sm animate-in fade-in zoom-in-95 duration-200"
            style={{
              top: coords.top,
              left: Math.max(
                20,
                Math.min(coords.left, window.innerWidth - 570)
              ),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {loading && !data ? (
              <div className="p-8 flex justify-center items-center">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : data ? (
              <div className="flex flex-col text-left">
                {/* Header */}
                <div className="bg-slate-900/50 px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <img
                      src={data.ownerAvatar}
                      alt={data.ownerLogin}
                      className="w-5 h-5 rounded-full"
                    />
                    <a
                      href={`https://github.com/${repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-white hover:text-indigo-400 transition-colors"
                    >
                      {data.name}
                    </a>
                    <span className="px-2 py-0.5 text-[11px] font-medium rounded-md border border-white/10 text-slate-400">
                      Public
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs"></div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Branch / Code Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-4 text-slate-400 text-xs md:text-sm">
                      <a
                        href={`https://github.com/${repo}/tree/${data.defaultBranch}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-md hover:bg-white/5 text-slate-300 font-medium transition-colors"
                      >
                        <GitBranch size={14} className="text-indigo-400" />{' '}
                        {data.defaultBranch}
                      </a>
                      <a
                        href={`https://github.com/${repo}/branches`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                      >
                        <GitBranch size={14} className="opacity-70" /> 5
                        Branches
                      </a>
                      <a
                        href={`https://github.com/${repo}/tags`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                      >
                        <Tag size={14} className="opacity-70" /> 0 Tags
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm"></div>
                  </div>

                  {/* File List Table */}
                  <div className="border border-white/10 rounded-md overflow-hidden bg-black/20 text-xs md:text-sm">
                    {/* Latest Commit Header */}
                    <div className="bg-slate-900/30 px-4 py-3 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-2 overflow-hidden flex-1">
                        <img
                          src={data.latestCommit.authorAvatar}
                          alt={data.latestCommit.author}
                          className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/10"
                        />
                        <a
                          href={`https://github.com/${data.latestCommit.author}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-white whitespace-nowrap hover:text-indigo-400 transition-colors"
                        >
                          {data.latestCommit.author}
                        </a>
                        <a
                          href={`https://github.com/${repo}/commit/${data.latestCommit.hash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 truncate max-w-[150px] md:max-w-[300px] hover:text-teal-400 transition-colors"
                        >
                          {data.latestCommit.message}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 shrink-0">
                        <a
                          href={`https://github.com/${repo}/commit/${data.latestCommit.hash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-indigo-400 transition-colors font-mono hidden sm:block"
                        >
                          {data.latestCommit.hash}
                        </a>
                        <span className="hidden sm:block">
                          {timeAgo(data.latestCommit.date)}
                        </span>
                        <a
                          href={`https://github.com/${repo}/commits/${data.defaultBranch}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium flex items-center gap-1 hover:text-indigo-400 transition-colors"
                        >
                          <GitCommit size={14} /> 26 Commits
                        </a>
                      </div>
                    </div>

                    {/* Files */}
                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                      {data.files.map((file: any) => (
                        <div
                          key={file.name}
                          className="flex items-center justify-between px-4 py-2 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                        >
                          <div className="flex items-center gap-3 w-1/3 min-w-[120px]">
                            {file.type === 'dir' ? (
                              <Folder
                                size={16}
                                className="text-indigo-400 fill-indigo-400/20 shrink-0"
                              />
                            ) : (
                              <File
                                size={16}
                                className="text-slate-500 shrink-0"
                              />
                            )}
                            <a
                              href={`https://github.com/${repo}/${file.type === 'dir' ? 'tree' : 'blob'}/${data.defaultBranch}/${file.path}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-300 group-hover:text-indigo-400 transition-colors truncate"
                            >
                              {file.name}
                            </a>
                          </div>
                          <a
                            href={`https://github.com/${repo}/commit/${data.latestCommit.hash}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-1/2 text-slate-500 truncate hover:text-teal-400 transition-colors px-2 hidden sm:block"
                          >
                            {data.latestCommit.message}
                          </a>
                          <div className="w-1/6 text-right text-slate-500 whitespace-nowrap shrink-0">
                            {timeAgo(data.latestCommit.date)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-red-400">
                Failed to load repository
              </div>
            )}
          </div>,
          document.body
        )}
    </span>
  );
};
