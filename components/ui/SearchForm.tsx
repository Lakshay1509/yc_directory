import React, { useState } from 'react'
import Form from "next/form"
import SearchformReset from './SearchformReset'
import { Search } from 'lucide-react'

const SearchForm = ({query}:{query?:string}) => {
    
    
    
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input

            type="text"
            name="query"
            defaultValue={query}
            placeholder="Search for startups..."
            className="search-input"
        
        />

        <div className='flex gap-2'>
            {query &&(
                <SearchformReset/>
            )}
            <button type="submit" className="search-btn text-white"><Search/></button>
        </div>

    </Form>
  )
}

export default SearchForm