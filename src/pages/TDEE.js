import React from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/posts.json';

export default function BlogOverview() {
  return (
    <section>
      <h1>Blog posts</h1>
      <ul>
        {posts.map((post) => {
          return <li>
            <Link to={`blog/${post.id}`}>
              {post.title}
            </Link>
          </li>
        })}
      </ul>
      <p>Amount of posts: <b>{posts.length}</b></p>
    </section>
  );
}
