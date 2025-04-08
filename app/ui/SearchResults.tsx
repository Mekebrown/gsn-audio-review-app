/**
 * @description Component that will eventually show the search results
 * 
 * @param {boolean} showSection  S/E
 * 
 * @example 
 * <SearchResults showSection={showSection} />
 * 
 * @returns {JSX.Element}
 */
export default function SearchResults({ showSection }: { showSection: boolean }) {
    return <div>{showSection ? "" : null}</div>;
};
