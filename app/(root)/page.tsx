import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/ui/SearchForm";
import StartupCard from "@/components/ui/StartupCard";
import {StartupTypeCard} from '../../components/ui/StartupCard'
import { sanityFetch } from "@/sanity/lib/live";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  
   
  return (
    <>
      <section className="pink_container">
      <p className="tag">Pitches, Investors, Founders</p>
      <h1 className="heading">Turning Big Ideas Into Thriving Startups</h1>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Invest in the Next Big Thing
      </p>
      <SearchForm query={query}/>
      </section>

    <section className="section_container">
      <p className="text-30-semibold">

        {query ? `Search results for "${query}"` : "Latest Pitches"}
      </p>

      <ul className="mt-7 card_grid">

        {posts?.length > 0 ? (
          posts.map((post : StartupTypeCard)=>(
            <StartupCard key={post?._id} post={post}/>

          ))
        ):(
          <p className="no-results">No posts found</p>
        )}

      </ul>
    </section>
      
    </>
  );
}
