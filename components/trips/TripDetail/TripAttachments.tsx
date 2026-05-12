interface Attachment {
  url: string;
  title: string;
}

interface TripAttachmentsProps {
  attachments: Attachment[];
}

export default function TripAttachments({ attachments }: TripAttachmentsProps) {
  if (!attachments?.length) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Downloads</h2>
      <div className="space-y-3">
        {attachments.map((a, i) => (
          <a
            key={i}
            href={a.url}
            target="_blank"
            className="flex items-center justify-between px-5 py-4 rounded-xl border bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">📄</div>
              <span className="text-gray-800 font-medium">{a.title}</span>
            </div>
            <span className="text-sm text-blue-600">Download →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
