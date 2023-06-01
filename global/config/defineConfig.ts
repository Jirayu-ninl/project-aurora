export const app = {
  NAME: 'TheIceJI',
  VERSION: '2023.05.01',
  UPDATE_DATE: 'May 1, 2023',
  Dependencies: {
    Aurora: '1.0',
    React: '18.2.0',
    NextJs: '13.4.3',
    ThreeJs: '152.2',
  },
  GOOGLE_ANALYTICS: 'UA-102194632-3',
  GOOGLE_TAG_MANAGER: 'GTM-KWRQQVP',
  Functions: {
    useThree: true,
    useAudio: true,
    useAuth: true,
    useWeb3: true,
  },
}

export const metaData = {
  appName: 'TheIceJi',
  title: 'TheIceJI - Official Website',
  url: 'https://TheIceJI.com',
  description:
    "I'm Jirayu Ninlapun, and I'm a Cinematic Art student at Bangkok University. I've worked as a Web Developer for three years and am an expert in Front-end and Web-animation.",
  coverImg: '/og.jpg',
  author: 'Jirayu Ninlapun',
  keywords: ['TheIceJi', 'Jirayu Ninlapun', 'Web Developer'],
  twitterID: '@theiceji',
}

export const contacts = {
  facebook: 'jirayunlp',
  messenger: 'jirayunlp',
  instagram: 'the_iceji',
  youtube: '@theiceji',
  mail: 'Jirayu.Ninl@gmail.com',
  github: 'Jirayu-ninl',
  twitter: 'ice14798',
  discord: 'pZ4Rz6BQx2',
}

export const theme = {
  defaultTheme: 'dark',
  color: {
    primary: {
      0: '#FFC900',
    },
    primaryShade: {
      0: '#FFE171',
      1: '#FFD539',
      2: '#FFC900',
      3: '#C69C00',
      4: '#8E7000',
    },
    secondary: {
      0: '#ACFDEF',
      1: '#75FCE5',
      2: '#51FBDE',
      3: '#04C2A2',
      4: '#038A73',
    },
    tertiary: {
      0: '#C0AAFF',
      1: '#9771FF',
      2: '#7341FF',
      3: '#4300FF',
      4: '#3400C6',
    },
    quaternary: {
      0: '#FFB3B3',
      1: '#FF8080',
      2: '#ff3b3b',
      3: '#E60000',
      4: '#B30000',
    },
    background: {
      1: '#1A1A1A',
      2: '#03131a',
      3: '#072c3b',
    },
  },
}

const defineConfig = {
  metaData: metaData,
  contacts: contacts,
  app: app,
  theme: theme,
}

export default defineConfig
