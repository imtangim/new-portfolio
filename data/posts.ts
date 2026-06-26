import type { BlogPost, Comment } from "@/types/blog";

type LegacyBlogPost = BlogPost & {
  initialLikes?: number;
  initialDislikes?: number;
  initialComments?: Comment[];
};

export const blogPosts: LegacyBlogPost[] = [
  {
    slug: "building-offline-first-flutter-apps",
    title: "Building Offline-First Flutter Apps That Actually Work",
    excerpt:
      "How to design sync strategies, local persistence, and conflict resolution so your app stays usable when the network doesn't.",
    date: "2025-11-14",
    readTime: "8 min read",
    tags: ["Flutter", "Architecture", "Offline"],
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    ],
    content: [
      {
        type: "paragraph",
        text: "Most mobile users don't live in perfect connectivity. They ride elevators, take flights, and commute through dead zones. An app that freezes when offline isn't just annoying — it breaks trust.",
      },
      {
        type: "heading",
        text: "Start with local-first data",
      },
      {
        type: "paragraph",
        text: "Treat the local database as the source of truth during a session. SQLite via drift, Hive, or Isar gives you fast reads and writes without waiting on the network. The UI should always read from local state and react to changes immediately.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=700&fit=crop",
        alt: "Developer working on a mobile app architecture diagram",
        caption: "Local-first architecture keeps the UI responsive regardless of network state.",
      },
      {
        type: "heading",
        text: "Queue writes, sync in the background",
      },
      {
        type: "paragraph",
        text: "Every mutation goes into an outbox table first. A background worker retries failed syncs with exponential backoff. Users see their changes instantly; the server catches up when it can.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop",
            alt: "Analytics dashboard on a laptop",
          },
          {
            src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=450&fit=crop",
            alt: "Code editor with Flutter project open",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Conflict resolution is where most teams stumble. Last-write-wins is simple but loses data. For collaborative features, consider operational transforms or CRDTs. For personal data like expense entries, client-wins with server validation often suffices.",
      },
    ],
    initialLikes: 42,
    initialDislikes: 3,
    initialComments: [
      {
        id: "c1",
        author: "Sarah K.",
        text: "The outbox pattern explanation is exactly what I needed for our expense tracker. Thanks!",
        createdAt: "2025-11-15T10:30:00Z",
      },
      {
        id: "c2",
        author: "Rahim M.",
        text: "Have you compared drift vs Isar for larger datasets? Curious about migration pain.",
        createdAt: "2025-11-16T14:22:00Z",
      },
    ],
  },
  {
    slug: "wireguard-in-flutter-lessons-learned",
    title: "WireGuard in Flutter: Lessons from Shipping a VPN",
    excerpt:
      "Platform channels, native module integration, and the edge cases nobody warns you about when embedding WireGuard in a cross-platform app.",
    date: "2025-09-02",
    readTime: "12 min read",
    tags: ["Flutter", "VPN", "Native"],
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    ],
    content: [
      {
        type: "paragraph",
        text: "Shipping Enova VPN across Android, iOS, macOS, and Android TV taught me that WireGuard's simplicity on paper doesn't translate to simplicity in a Flutter wrapper. Each platform has its own VPN permission model, lifecycle quirks, and background execution limits.",
      },
      {
        type: "heading",
        text: "Platform channels are not enough",
      },
      {
        type: "paragraph",
        text: "Early prototypes used basic MethodChannels for connect/disconnect. Production required event streams for connection state, throughput metrics, and error codes — all on separate isolates to avoid janking the UI thread.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=700&fit=crop",
        alt: "Server room with network cables",
        caption: "Tunnel lifecycle events need dedicated native listeners on each platform.",
      },
      {
        type: "heading",
        text: "Android TV is a different beast",
      },
      {
        type: "paragraph",
        text: "Leanback launcher constraints, D-pad navigation, and the lack of a system VPN tray icon forced us to build a connection status overlay that persists across activities. Testing on real hardware — not just emulators — caught three showstopper bugs.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=450&fit=crop",
            alt: "Matrix-style code on a screen",
          },
          {
            src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=450&fit=crop",
            alt: "Network infrastructure close-up",
          },
        ],
      },
    ],
    initialLikes: 67,
    initialDislikes: 5,
    initialComments: [
      {
        id: "c3",
        author: "Alex T.",
        text: "The Android TV section saved me weeks. We hit the exact same overlay issue.",
        createdAt: "2025-09-03T09:15:00Z",
      },
    ],
  },
  {
    slug: "flutter-widget-design-patterns",
    title: "Flutter Widget Design Patterns for Maintainable UIs",
    excerpt:
      "Composition over inheritance, when to extract widgets, and how to keep your widget tree readable as features grow.",
    date: "2025-07-20",
    readTime: "6 min read",
    tags: ["Flutter", "UI", "Best Practices"],
    coverImage: "https://images.unsplash.com/photo-1618477388954-7852f326cc6e?w=1200&h=630&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "A Flutter codebase doesn't collapse from bad algorithms — it collapses from 400-line build methods and widgets that do everything. The fix isn't more abstractions; it's the right abstractions at the right boundaries.",
      },
      {
        type: "heading",
        text: "The widget extraction rule",
      },
      {
        type: "paragraph",
        text: "Extract a widget when you can name it after what it represents, not how it's built. `PrayerTimeCard` is a good name. `RedContainerWithPadding` is a smell. If you're passing more than five parameters, consider a small data class.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1618477388954-7852f326cc6e?w=1200&h=700&fit=crop",
        alt: "Mobile app UI design mockups on a desk",
        caption: "Small, named widgets map cleanly to design system components.",
      },
      {
        type: "paragraph",
        text: "For stateful sections, prefer lifting state to a parent or using a lightweight state management solution early. Retrofitting Provider or Riverpod into a deeply nested widget tree is painful — plan for it when the screen has more than three interactive elements.",
      },
    ],
    initialLikes: 28,
    initialDislikes: 1,
    initialComments: [],
  },
  {
    slug: "firebase-realtime-at-scale",
    title: "Firebase Realtime at Scale: What We Learned Building Live Features",
    excerpt:
      "Firestore listeners, presence systems, and the cost surprises that come with real-time mobile apps serving thousands of concurrent users.",
    date: "2025-05-08",
    readTime: "10 min read",
    tags: ["Firebase", "Flutter", "Realtime"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    ],
    content: [
      {
        type: "paragraph",
        text: "Real-time feels magical until your Firestore bill does. Building live prayer time updates and community features for Deen forced us to rethink how we structure listeners, cache aggressively, and batch writes.",
      },
      {
        type: "heading",
        text: "Listener hygiene",
      },
      {
        type: "paragraph",
        text: "Every open listener is a running cost. Scope listeners to the smallest document or collection possible. Detach on dispose — Flutter's widget lifecycle makes this easy, but background isolates and cached pages are easy to forget.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=450&fit=crop",
            alt: "Code on a laptop screen",
          },
          {
            src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop",
            alt: "Team collaborating around a laptop",
          },
          {
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop",
            alt: "Data analytics dashboard",
          },
        ],
      },
      {
        type: "paragraph",
        text: "For presence (who's online now), heartbeat documents with TTL via Cloud Functions beat polling. Clients write a timestamp every 30 seconds; a scheduled function cleans stale entries. Simple, predictable, cheap.",
      },
    ],
    initialLikes: 35,
    initialDislikes: 2,
    initialComments: [
      {
        id: "c4",
        author: "Nadia H.",
        text: "The listener hygiene tips cut our Firestore reads by 40%. Worth every minute.",
        createdAt: "2025-05-09T16:45:00Z",
      },
      {
        id: "c5",
        author: "James L.",
        text: "Would love a follow-up on security rules for real-time features.",
        createdAt: "2025-05-10T11:00:00Z",
      },
    ],
  },
];
