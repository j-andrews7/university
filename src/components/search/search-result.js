import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="hit-count">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <Link to={hit.slug}>
    <div className="my-2 p-4 bg-coolGray-100 rounded-md">
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  </Link>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <Hits className="hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({ indices }) => (
  <div className="mx-8 my-4">
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <div className="flex justify-between mt-8">
      <HitCount />
      <PoweredBy className="flex" />
    </div>
  </div>
)

export default SearchResult