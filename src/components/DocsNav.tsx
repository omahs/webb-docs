import React, { useState } from 'react'
import SlideDownNav from '../components/SlideDownNav'
import Link from './Link'
import Icon from './Icon'

interface DocsNavProps {
  section: string
  sideNav: {
    name: string
    items: {
      title: string
      link: string
    }[]
  }[]
  globalNav: { section: string; url: string; external: boolean }[]
  pathname: string
  hashLink: string
}

export default function DocsNav({
  section,
  sideNav,
  globalNav,
  pathname,
  hashLink,
}: DocsNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav
      className={`sticky top-16 mb-12 h-[calc(100vh-100px)] ${
        isOpen ? `w-16 overflow-y-hidden` : `w-64 overflow-y-auto `
      }`}
    >
      <div>
        <div
          className={`flex ${
            isOpen
              ? `transition-all transform duration-75 ease-in-out justify-start px-4`
              : `transition-all transform duration-75 ease-in-out justify-between px-4`
          } items-center h-14 bg-webbWhite dark:bg-webbDarkest mt-10 `}
        >
          <div className={`${isOpen && `hidden`}`}>
            <span className="font-bold">
              {section === 'docs'
                ? 'Docs'
                : section === 'tutorials'
                ? 'Tutorials'
                : section === 'how to guides'
                ? 'How-to Guides'
                : null}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-webbDarkest dark:bg-white p-2 rounded-lg transform transition-opacity duration-300 ease-in-out hover:opacity-80 focus:outline-none"
          >
            <svg
              className={`fill-current text-white dark:text-webbDarkest ${
                isOpen && 'rotate-180'
              }`}
              width="12"
              height="10"
              viewBox="0 0 12 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9001 9.90002C11.0857 9.90002 11.2638 9.82627 11.3951 9.695C11.5263 9.56372 11.6001 9.38568 11.6001 9.20002L11.6001 0.800025C11.6001 0.614373 11.5263 0.436325 11.3951 0.305049C11.2638 0.173774 11.0857 0.100024 10.9001 0.100024C10.7144 0.100024 10.5364 0.173774 10.4051 0.305049C10.2738 0.436325 10.2001 0.614373 10.2001 0.800025L10.2001 9.20002C10.2001 9.38568 10.2738 9.56372 10.4051 9.695C10.5364 9.82627 10.7144 9.90002 10.9001 9.90002ZM3.695 3.39492C3.82251 3.2629 3.89306 3.08608 3.89147 2.90254C3.88987 2.71901 3.81626 2.54344 3.68647 2.41365C3.55668 2.28387 3.38111 2.21025 3.19758 2.20865C3.01404 2.20706 2.83722 2.27761 2.7052 2.40512L0.605196 4.50512C0.473967 4.63639 0.400247 4.81441 0.400247 5.00002C0.400247 5.18564 0.473967 5.36366 0.605196 5.49492L2.7052 7.59492C2.76977 7.66178 2.84701 7.71511 2.93241 7.7518C3.01782 7.78848 3.10967 7.80779 3.20262 7.8086C3.29556 7.80941 3.38774 7.7917 3.47377 7.7565C3.55979 7.7213 3.63795 7.66933 3.70367 7.6036C3.7694 7.53788 3.82138 7.45972 3.85657 7.37369C3.89177 7.28766 3.90948 7.19549 3.90867 7.10254C3.90787 7.0096 3.88855 6.91774 3.85187 6.83234C3.81518 6.74694 3.76185 6.6697 3.695 6.60512L2.7899 5.70002L8.1001 5.70002C8.28575 5.70002 8.4638 5.62627 8.59507 5.495C8.72635 5.36372 8.8001 5.18568 8.8001 5.00002C8.8001 4.81437 8.72635 4.63633 8.59507 4.50505C8.4638 4.37377 8.28575 4.30002 8.1001 4.30002L2.7899 4.30002L3.695 3.39492Z"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen
              ? 'transition-all transform duration-75 ease-in-out opacity-0'
              : 'transition-all transform duration-500 ease-in-out opacity-100'
          }`}
        >
          <div className="pt-2">
            {sideNav.map((section, index: number) => {
              const current = section.items.some(item => {
                return item.link === pathname || item.link === hashLink
              })
              return (
                <SlideDownNav
                  key={index}
                  section={section}
                  current={current}
                  pathname={pathname}
                  hashLink={hashLink}
                />
              )
            })}
          </div>
          <div>
            <hr className="mt-6" />
            <div className="flex items-center justify-between px-20 lg:px-4 py-4">
              <span>More Ways to Learn</span>
            </div>
            {globalNav.map((navItem, index) => {
              return (
                <div
                  key={index}
                  className="px-20 lg:px-4 py-4 lg:dark:bg-webbDarkest"
                >
                  <Link to={navItem.url}>
                    <div className="flex items-center justify-between hover:no-underline">
                      <div className="font-medium text-webbDark dark:text-white">
                        {navItem.section}
                      </div>
                      <Icon
                        name="arrowDown"
                        className="fill-current text-webbDark dark:text-white transform -rotate-90"
                      />
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
