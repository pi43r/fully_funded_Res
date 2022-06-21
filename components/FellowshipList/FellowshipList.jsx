import { useState, useEffect } from "react";
import styles from "./FellowshipList.module.css";
import Link from "next/link";
import { isEmpty } from "lodash";
import Filters from "./Filters";
import FellowshipItem from "./FellowshipItem";
import Image from "next/image";
import Search from "./Search";
import { sortFellowships, filterFellowships } from "./listUtils";
import { ChevronDown } from "../icons";
import cx from "clsx";

export default function GridComp({ fellowships = [] }) {
  const [sortBy, setSortBy] = useState("createdAt");
  const [viewMode, setViewMode] = useState("cards");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [resultPopup, setResultPopup] = useState(false);
  // const [sortDirection, sortDirectionSet] = useState("ASC");
  const [filteredFellowships, filteredFellowshipsSet] = useState(
    sortFellowships(fellowships, sortBy)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [appliedFilters, setAppliedFilters] = useState(0);

  const handleToggleViewMode = () =>
    setViewMode(viewMode === "cards" ? "list" : "cards");

  const applySearchTerm = (newSearchTerm = "") => {
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() === "") {
      filteredFellowshipsSet(fellowships);
    }

    filteredFellowshipsSet(
      sortFellowships(
        fellowships.filter((val) => {
          return val.fields.title
            .toLowerCase()
            .includes(newSearchTerm.toLowerCase());
        }),
        sortBy
      )
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    filteredFellowshipsSet(sortFellowships(fellowships, sortBy));
  };

  const clearFilters = () => {
    setIsFiltersOpen(false);
    filteredFellowshipsSet(sortFellowships(fellowships, sortBy));
  };

  const handleToggleSort = () => {
    const newSortBy = sortBy === "createdAt" ? "deadline" : "createdAt";
    filteredFellowshipsSet(sortFellowships(filteredFellowships, newSortBy));
    setSortBy(newSortBy);
  };

  const handleApplyFilters = (filters) => {
    // TODO: correctly count the all filters
    const countAppliedFilters = Object.values(filters).reduce(
      (acc, curr) => (!curr ? acc : acc + 1),
      0
    );

    setAppliedFilters(countAppliedFilters);

    // filter
    const filtered = filterFellowships(fellowships, filters);
    // reapply sort and set
    filteredFellowshipsSet(sortFellowships(filtered, sortBy));

    clearSearch();
    setIsFiltersOpen(false);
  };

  return (
    <div>
      <div className={styles.searchOpt}>
        <div className={styles.searchMain}>
          <button className={styles.filterBtn} onClick={handleToggleViewMode}>
            {"View as:"}
            <span className={styles.filterBtnValue}>{viewMode}</span>
          </button>

          <button className={styles.filterBtn} onClick={handleToggleSort}>
            {"Sort by: "}
            <span className={styles.filterBtnValue}>
              {sortBy === "deadline"
                ? "Deadline approaching"
                : "Recently added"}
            </span>
          </button>

          <button
            className={styles.filterBtn}
            onClick={() => setIsFiltersOpen(true)}
          >
            {"Filters: "}
            <span className={styles.filterBtnValue}>
              {appliedFilters > 0 ? appliedFilters : "None"}
            </span>
            <ChevronDown className={styles.filterBtnIcon} />
          </button>
          <Filters
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            className={styles.searchFilter}
            onApplyFilters={handleApplyFilters}
            onClear={clearFilters}
          />
        </div>

        <Search
          value={searchTerm}
          onApplySearch={applySearchTerm}
          onClearSearch={clearSearch}
        />
      </div>

      <ul className={cx(styles.wrapper, viewMode === "list" && styles.list)}>
        {filteredFellowships.map((fellowship, index) => {
          // console.log(fellowship.fields.deadline, "fields");

          return (
            <div
              className={styles.item}
              key={fellowship.sys.id}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <FellowshipItem
                viewMode={viewMode}
                fellowship={fellowship.fields}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
