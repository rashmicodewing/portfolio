/**
 * Every piece of personal content on the site lives here.
 * Edit this file to update the site - no component changes needed.
 *
 * PLACEHOLDERS: a link whose `url` is left as an empty string is treated as
 * "not configured yet" and is simply not rendered, rather than shipping a
 * button that goes nowhere. Fill the url in and it appears automatically.
 */

export type Link = { label: string; url: string }

export const profile = {
  name: 'Rashmi Pokharel',
  wordmark: 'Rashmi',
  monogram: 'RP',
  role: 'Software Developer',
  location: 'Nepal',
  /** Small label above the hero headline. */
  kicker: 'Software Developer · Nepal',
  headline: 'Building Reliable Web Experiences & Payment Integrations.',
  lede:
    "I'm a Software Developer passionate about building WordPress products, integrating payment gateways, and solving real-world engineering challenges. I turn complex technical requirements into reliable, maintainable solutions.",
  footerLine: 'Software Developer building WordPress products and payment integrations.',
  email: 'rashmipokharel247@gmail.com',
}

/** Leave a url empty to hide that link until you have one. */
export const socials: Link[] = [
  { label: 'GitHub', url: 'https://github.com/rashmicodewing' },
  { label: 'LinkedIn', url: '' }, // <- add your profile URL here
]

export const about = {
  heading: 'A Little About Me',
  paragraphs: [
    'I work across two sides of the web: WordPress product development, and the payment technology that sits behind a checkout. Most days that means writing PHP against an API contract, reading provider documentation closely, and making sure what comes back is what the product expected.',
    "On the WordPress side I build and maintain themes and plugins - custom post types, hooks and filters, REST endpoints, Elementor widgets - and spend a fair amount of time on the less glamorous work: PHP deprecations, translation loading, third-party plugin conflicts, frontend styling that broke in someone else's update.",
    "I try to learn continuously, write code the next person can follow, and work through problems systematically rather than by guesswork. A fix I can't explain isn't finished.",
  ],
  highlights: [
    'Building and maintaining WordPress themes and plugins',
    'Integrating third-party payment APIs',
    'REST APIs, authentication, transaction requests, payment status handling',
    'Debugging technical issues and resolving compatibility problems',
    'Developing Elementor integrations and custom widgets',
    'Collaborating with teams to improve software products',
  ],
}

export type Role = {
  title: string
  org: string
  kind: string
  summary: string
  points: string[]
}

export const experience: Role[] = [
  {
    title: 'Software Developer',
    org: 'PayLexer',
    kind: 'Payment Technology',
    summary:
      'PayLexer connects merchants with multiple payment gateways through a unified integration. Payment work is unforgiving of loose assumptions - API contracts, authentication, redirects, asynchronous notifications and transaction states all have to line up before money moves.',
    points: [
      'Integrating payment gateways through APIs and hosted checkout flows',
      'Implementing authentication, transaction creation, payment status retrieval, and callback or webhook handling',
      'Testing integrations using provider sandbox environments',
      'Troubleshooting API errors, transaction failures, and inconsistencies in payment status',
      'Working with providers to understand API documentation, credentials, supported currencies, and testing requirements',
      'Improving reliability and compatibility across payment gateway integrations',
    ],
  },
  {
    title: 'WordPress Development',
    org: 'Themes & Plugins',
    kind: 'Product Engineering',
    summary:
      'Hands-on theme and plugin work: shipping features, keeping products current with PHP and WordPress releases, and resolving the compatibility problems that only surface once real sites are involved.',
    points: [
      'Developing WordPress themes and plugins',
      'Creating custom Elementor widgets and integrations',
      'Implementing theme and plugin features',
      'Fixing bugs and resolving PHP compatibility and deprecation issues',
      'Addressing translation loading, frontend styling, and third-party plugin compatibility',
      'Maintaining code quality and preparing product updates',
    ],
  },
]

export type Project = {
  title: string
  category: string
  description: string
  highlights: string[]
  tech: string[]
  /** Optional public link. Omit it and `status` is shown instead. */
  link?: Link
  status?: string
}

export const projects: Project[] = [
  {
    title: 'PayLexer Payment Gateway Integrations',
    category: 'Payment Technology / API Integration',
    description:
      'Working on payment gateway integrations that connect merchant websites with external payment providers through a unified platform.',
    highlights: [
      'REST API integration',
      'Authentication and transaction processing',
      'Hosted checkout and redirect flows',
      'Webhooks and payment status handling',
      'Sandbox testing and troubleshooting',
    ],
    tech: ['PHP', 'REST APIs', 'JSON', 'HTTP', 'Payment gateway APIs'],
    status: 'Private Project',
  },
  {
    title: 'Shop That Look',
    category: 'WordPress Plugin',
    description:
      'A WordPress plugin concept designed to help bloggers, publishers, influencers, and affiliate marketers make images shoppable through interactive product hotspots.',
    highlights: [
      'Custom post type for shoppable images',
      'Interactive product hotspots with titles and links',
      'Embedding shoppable content into pages and posts',
      'Product click tracking',
      'A foundation for future affiliate and commerce integrations',
    ],
    tech: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS'],
    status: 'Details Available on Request',
  },
  {
    title: 'Trailvista WordPress Theme',
    category: 'WordPress Theme Development',
    description:
      'A WordPress theme project focused on travel-oriented websites and presenting destination content through a tailored theme experience.',
    highlights: [
      'Theme development and template structure',
      'Feature implementation and styling',
      'Preparing the product for submission',
    ],
    tech: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS'],
    status: 'Details Available on Request',
  },
  {
    title: 'Travel Monster Elementor Integrations',
    category: 'WordPress / Elementor',
    description:
      'Enhancements to a travel-focused WordPress product through Elementor integration and theme-building capabilities.',
    highlights: [
      'Elementor header and footer builder functionality',
      'Integration with WordPress custom post types',
      'Bug fixes and product improvements',
      'Compatibility and update work',
    ],
    tech: ['WordPress', 'PHP', 'Elementor', 'JavaScript', 'CSS'],
    status: 'Details Available on Request',
  },
  {
    title: 'WordPress Theme and Plugin Improvements',
    category: 'Open-Source / Product Engineering',
    description:
      'Ongoing work across WordPress products: picking up feature requests, fixing what breaks on the frontend, and keeping code current as PHP and WordPress move forward.',
    highlights: [
      'Feature requests and product improvements',
      'Frontend fixes and styling corrections',
      'Compatibility improvements across plugins and themes',
      'Translation loading fixes',
      'PHP maintenance and deprecation cleanup',
    ],
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    status: 'Details Available on Request',
  },
]

export type IconName =
  | 'code'
  | 'layers'
  | 'card'
  | 'terminal'
  | 'map'
  | 'search'
  | 'shield'

export type SkillGroup = { title: string; icon: IconName; items: string[] }

export const skills: SkillGroup[] = [
  {
    title: 'Languages & Web',
    icon: 'code',
    items: ['PHP', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'WordPress Development',
    icon: 'layers',
    items: [
      'Themes and plugins',
      'Custom post types and metadata',
      'Hooks and filters',
      'REST API development',
      'Elementor widgets and integrations',
      'Theme customization and compatibility',
    ],
  },
  {
    title: 'Payment Integration',
    icon: 'card',
    items: [
      'REST API integrations',
      'JSON and HTTP',
      'API authentication',
      'Hosted checkout flows',
      'Webhooks and callbacks',
      'Transaction status handling',
      'Sandbox testing and debugging',
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'terminal',
    items: [
      'Git and GitHub',
      'WP-CLI',
      'PHPCS',
      'Local WordPress environments',
      'API testing tools',
    ],
  },
]

export const approach = {
  heading: 'How I Approach Problems',
  lede: 'Three habits that shape how I work through an unfamiliar system.',
  principles: [
    {
      icon: 'map' as IconName,
      title: 'Understand the System',
      body: 'Read the documentation, understand the requirement, and map the expected behaviour before writing the implementation.',
    },
    {
      icon: 'search' as IconName,
      title: 'Debug with Purpose',
      body: 'Reproduce the issue, inspect API responses and logs, identify the root cause, and test the fix carefully rather than guessing.',
    },
    {
      icon: 'shield' as IconName,
      title: 'Build for Maintainability',
      body: 'Write clear, reusable code and weigh compatibility, reliability and long-term maintenance alongside the immediate fix.',
    },
  ],
}

export const contact = {
  heading: 'Have a Project in Mind?',
  lede:
    "I'm always interested in connecting with developers, teams, and people building useful products. Let's talk about software, WordPress, or payment integrations.",
  cta: "Let's Connect",
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const seo = {
  title: 'Rashmi Pokharel - Software Developer | WordPress & Payment Integrations',
  description:
    'Software Developer from Nepal building WordPress themes and plugins and integrating payment gateways. Work on PayLexer, Elementor integrations, and WordPress product engineering.',
  url: 'https://rashmipokharel247.com.np/',
}
