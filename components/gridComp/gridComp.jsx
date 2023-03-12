import styles from './gridComp.module.css'
import stylesFilter from '../SearchFilter/SearchFilter.module.css'
import Link from 'next/link'
import SearchFilter from '../SearchFilter/SearchFilter'
import { useState, useEffect } from 'react'
import GridView from './GridView'
import SearchIcon from '../..//public/FFR-assets/Icons/search_icon.svg'
import Image from 'next/image'

export default function GridComp({ fellowship }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [toggleViewMode, setToggleViewMode] = useState(false)
  const [sortByDeadline, setSortByDeadline] = useState(false)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [resultPopup, setResultPopup] = useState(false)
  const [country, setCountry] = useState()
  const [type, setType] = useState({})
  const [eligibility, setEligibility] = useState()
  const [duration, setDuration] = useState()
  const [fee, setFee] = useState(false)
  const [field, setField] = useState({})
  // const [sortDirection, sortDirectionSet] = useState("ASC");
  const [filteredFellowships, filteredFellowshipsSet] = useState(fellowship)

  const applySearchTerm = () => {
    filteredFellowshipsSet(
      fellowship.filter((val) => {
        if (searchTerm.trim() === '') {
          return true
        } else {
          return val.fields.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        }
      })
    )
  }

  const applyFilters = () => {
    filteredFellowshipsSet(
      fellowship
        .filter((fellowship) => {
          return country
            ? fellowship?.fields?.location?.toLowerCase() ===
                country.toLowerCase()
            : true
        })
        .filter((fellowship) => {
          const arrayOfValidTypes = Object.entries(type)
            .filter(([_fieldName, fieldNameValue]) => fieldNameValue)
            .map(([fieldName]) => fieldName.toLowerCase())

          return arrayOfValidTypes.length > 0
            ? arrayOfValidTypes.includes(
                fellowship?.fields?.type?.toLowerCase()
              )
            : true
        })
        .filter((fellowship) => {
          return eligibility
            ? fellowship?.fields?.eligibility?.toLowerCase() ===
                eligibility.toLowerCase()
            : true
        })
        .filter((fellowship) => {
          return duration
            ? fellowship?.fields?.duration?.toLowerCase() ===
                duration.toLowerCase()
            : true
        })
        .filter((fellowship) => {
          const arrayOfValidFields = Object.entries(field)
            .filter(([_fieldName, fieldNameValue]) => fieldNameValue)
            .map(([fieldName]) => fieldName.toLowerCase())

          return arrayOfValidFields.length > 0
            ? arrayOfValidFields.includes(
                fellowship?.fields?.field?.toLowerCase()
              )
            : true
        })
        .sort((a, b) => {
          // Sorting By Deadline
          if (sortByDeadline) {
            return new Date(a.fields.deadline) - new Date(b.fields.deadline)
          }

          // Sorting By Date Added
          return new Date(a.sys.createdAt) - new Date(b.sys.createdAt)
        })
    )
  }

  useEffect(() => {
    applyFilters()
  }, [sortByDeadline])

  return (
    <div>
      <div className={styles.searchOpt}>
        <div className={styles.searchMain}>
          <div>
            <button
              className={styles.buttonFilters}
              onClick={() => setButtonPopup(true)}
            >
              Filters:
            </button>
          </div>

          <div className={styles.searchFilter}>
            <SearchFilter
              trigger={buttonPopup}
              setTrigger={setButtonPopup}
              className={styles.searchFilter}
            >
              <div>
                <h1 className={styles.searchFilterTitle}>
                  Filter open calls by
                </h1>
              </div>

              <div>
                <h1 className={styles.searchFilterSub}>Location</h1>

                {/* <label htmlFor="location" >location:</label> */}
                <select
                  className={styles.selectBox}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  id="location"
                  name="location"
                >
                  <option value="">Select Country</option>
                  {[
                    'France',
                    'Germany',
                    'India',
                    'England',
                    'Australia',
                    'New Zealand',
                    'Tonga',
                    'America',
                  ].map((datum) => (
                    <option key={datum} value={datum}>
                      {datum}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h1 className={styles.searchFilterSub}>Type</h1>

                {['Production', 'Exhibition', 'Research'].map((val, index) => (
                  <div key={`${val}-${index}`}>
                    <input
                      type="checkbox"
                      className={styles.checkBox}
                      id={val}
                      value={val}
                      name="type"
                      checked={type[val]}
                      onChange={(event) =>
                        setType((prev) => ({
                          ...prev,
                          [val]: event.target.checked,
                        }))
                      }
                    />
                    <label htmlFor={val}>{val}</label>
                  </div>
                ))}
              </div>

              <div>
                <h1 className={styles.searchFilterSub}>Eligibility</h1>
                {/* <label htmlFor="Eligibility">Eligibility:</label> */}
                <select
                  className={styles.selectBox}
                  id="Eligibility"
                  name="Eligibility"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                >
                  <option value="">select criteria</option>
                  <option value="elig one">elig one</option>
                  <option value="elig two">elig two</option>
                  <option value="elig three">elig three</option>
                  <option value="elig four">elig four</option>
                </select>
              </div>

              <div>
                <h1 className={styles.searchFilterSub}>Application Fee</h1>
                <input
                  type="checkbox"
                  id="Without Application Fee"
                  name="Without Application Fee"
                  // onChange={(e) => setFee(e.target.value)}
                />
                <label htmlFor="Without Application Fee">
                  Without Application Fee
                </label>
              </div>

              <div>
                <h1 className={styles.searchFilterSub}>Duration</h1>
                {/* <label htmlFor="Duration">Duration:</label> */}
                <select
                  className={styles.selectBox}
                  id="Duration"
                  name="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">select residency duration</option>
                  <option value="duration one">duration one</option>
                  <option value="duration two">duration two</option>
                  <option value="duration three">duration three</option>
                  <option value="duration four">duration four</option>
                </select>
              </div>

              <div>
                <h1 className={styles.searchFilterSub}>Field</h1>

                {[
                  'Visual',
                  'Multidisciplinary',
                  'Curatorial',
                  'Sound',
                  'Literature',
                  'Performance',
                  'Dance',
                ].map((val, index) => (
                  <div key={`${val}-${index}`}>
                    <input
                      type="checkbox"
                      id={val}
                      value={val}
                      name="field"
                      checked={field[val]}
                      onChange={(event) =>
                        setField((prev) => ({
                          ...prev,
                          [val]: event.target.checked,
                        }))
                      }
                    />
                    <label htmlFor={val}>{val}</label>
                  </div>
                ))}
              </div>

              <button onClick={applyFilters}>Search</button>
            </SearchFilter>
          </div>
          <div className={styles.searchThreeButtons}></div>

          <button
            className={styles.dropdownBtn}
            onClick={() => setSortByDeadline(!sortByDeadline)}
          >
            {sortByDeadline
              ? 'Sort by: Deadline approaching'
              : 'Sort by: Recently added'}
          </button>

          <button
            className={styles.toggleBtn}
            onClick={() => setToggleViewMode(!toggleViewMode)}
          >
            {toggleViewMode ? 'view as: Cards' : ' view as: List'}
          </button>
        </div>

        <div>
          <div className={styles.searchText}>
            <input
              className={styles.searchBar}
              type="text"
              name="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              id="search"
              role="search"
              placeholder="Search Opportunities....."
            />
            <div>
              <button onClick={applySearchTerm} className={styles.searchBtn}>
                <Image
                  className={styles.btnSearchIcon}
                  src={SearchIcon}
                  alt="search"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.wrapper}>
        {filteredFellowships.map((fellowship) => {
          // console.log(fellowship.fields.deadline, "fields");
          const {
            title,
            slug,
            category,
            money,
            paragraph,
            thumbnail,
            location,
            type,
            deadline,
          } = fellowship.fields

          if (toggleViewMode) {
            return (
              <div className={styles.cards} key={fellowship.sys.id}>
                <div>
                  <span>{title}</span>

                  <ul>
                    <li>{slug}</li>
                    <li>{category}</li>
                    <li>{location}</li>
                    <li>{money}</li>
                  </ul>
                  <p>{paragraph}</p>
                  <p>{deadline}</p>

                  <button
                    className="button is-text has-text-weight-bold"
                    onClick={() => setResultPopup(true)}
                  >
                    Read more
                  </button>
                </div>
              </div>
            )
          }

          return (
            <div className={styles.cards} key={fellowship.sys.id}>
              <GridView
                title={title}
                slug={slug}
                category={category}
                money={money}
                paragraph={paragraph}
                thumbnail={thumbnail}
                fellowship={fellowship}
                location={location}
                type={type}
              />
            </div>
          )
        })}
      </ul>
    </div>
  )
}
