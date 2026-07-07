import React from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResult, setSearchQuery as setSearchQueryRedux } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for caching the results in redux store so that we don't make the api call again and again for the same search query
  // Also debouncing is there along with the caching, so that we don't make the api call again and again for the same search query

  // when we remove the search query from the input field, then no api call should be made

  /**
   *  searchCache = {
   *     "iphone": ["iphone 11", "iphone 14"]
   *  }
   *  searchQuery = iphone
   */

  const searchCache = useSelector((store) => store.search.cache);
  const activeSearchQuery = useSelector((store) => store.search.searchQuery);

  useEffect(() => {
    setSearchQuery(activeSearchQuery);
  }, [activeSearchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        // if the search query is in the cache, then set the suggestions from the cache
        setSuggestions(searchCache[searchQuery]);
      } else {
        // if the search query is not in the cache, then make the api call
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    console.log("API call - " + searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1] || []);

    // update the cache, after making the api call when the search query is not in the cache
    dispatch(cacheResult({ [searchQuery]: json[1] || [] }));
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setSearchQuery(trimmedQuery);
    dispatch(setSearchQueryRedux(trimmedQuery));
    setIsSearchFocused(false);
    searchInputRef.current?.blur();
    navigate("/");
  };

  // debouncing
  // make an api call after every keystroke but if the difference between the 2 api calls is less than 200ms, then decline the api call

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     getSearchSuggestions();
  //   }, 200);
  //   return () => clearTimeout(timer);
  // }, [searchQuery]);

  // const getSearchSuggestions = async () => {
  //   if (!searchQuery.trim()) {
  //     setSuggestions([]);
  //     return;
  //   }
  //   console.log("API call - " + searchQuery);
  //   const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
  //   const json = await data.json();
  //   setSuggestions(json[1] || []);
  // };

  /**
   * key i
   * render the component
   * useEffect hook is called
   * start timer => make api call after 200ms
   *
   * key ip
   * render the component
   * useEffect hook is called
   * start new timer => make api call after 200ms
   *
   * but if
   * key - i is called before 200ms
   * destroy the component(useEffect return is called to clear)
   * re-render the component
   * useEffect hook is called
   * start new timer => make api call after 200ms
   *
   * if 200ms is passed and no new key is pressed, then automatically it makes the api call
   */

  // this is without debouncing, when api call is made after every keystroke
  // useEffect(() => {
  //   getSearchSuggestions();
  // }, [searchQuery]);

  // const getSearchSuggestions = async () => {
  //   const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
  //   const json = await data.json();
  //   console.log(json);
  // };

  return (
    <div className="sticky top-0 z-50 bg-white grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-10 cursor-pointer"
          alt="hamburger-menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
        <img
          className="h-12 mx-2"
          alt="youtube-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl3qbJemf2mtQyV9jfQ0-9246Rg2xT5CS3rDVDNBfOA&s=10"
        />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div className="relative">
          <div>
            <input
              ref={searchInputRef}
              className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full text-md text-black font-bold"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery);
                }
              }}
            />
            <button
              className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100"
              onClick={() => handleSearch(searchQuery)}
            >
              🔍
            </button>
          </div>
          {isSearchFocused && suggestions.length > 0 && (
            <div
              className="absolute top-full left-0 bg-white py-2 px-2 shadow-lg rounded-lg w-[42rem] border border-gray-100 z-50"
              onMouseDown={(e) => e.preventDefault()}
            >
              <ul>
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearch(s)}
                  >
                    🔍 {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          className="h-10 col-span-1"
          alt="user-avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBa9ory8DV6Rjgcn424M0h38niQ1Xl04Rjb7CvE9I69w&s=10"
        />
      </div>
    </div>
  );
};

export default Header;
