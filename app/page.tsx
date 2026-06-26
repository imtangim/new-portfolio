import HomeClient from "@/components/HomeClient";
import { getAllPosts, getPortfolioData } from "@/lib/blog";

export default async function Home() {
  const [data, posts] = await Promise.all([getPortfolioData(), getAllPosts()]);

  return <HomeClient data={data} posts={posts} />;
}
