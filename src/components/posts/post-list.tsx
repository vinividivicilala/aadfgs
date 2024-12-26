import type { PostWithData } from '@/db/queries/posts';
import Link from 'next/link';
import paths from '@/paths';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className='border rounded p-2'>
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className='text-lg font-bold'>{post.title}</h3>
          <div className='flex flex-row gap-8'>
            <p className='text-xs text-gray-400'>By {post.user.name}</p>
            <p className='text-xs text-gray-400'>
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  const renderContent = () => {
    if (posts.length === 0) {
      return (
        <div className='border rounded p-2 flex justify-center items-center h-48'>
          <h2>No Posts Found</h2>
        </div>
      );
    }

    return renderedPosts;
  };

  return <div className='space-y-2'>{renderContent()}</div>;
}
