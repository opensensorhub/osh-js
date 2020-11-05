/**
 * Codeblock theme: https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes
 */

module.exports = {
  title: 'OpenSensorHub Web Client Toolkit',
  tagline: 'OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors.',
  url: 'http://opensensorhub.github.io/',
  baseUrl: '/osh-js/v2.0.0/documentationV2/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'OpenSensorHub', // Usually your GitHub org/user name.
  projectName: 'osh.js', // Usually your repo name.
  themes: [require.resolve('@docusaurus/theme-live-codeblock')],
  plugins: ['my-loaders'], // loader required for .svg
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/github'),
    },
    navbar: {
      title: '',
      logo: {
        alt: '',
        src: 'img/OSH-Logo-min.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {href: 'https://opensensorhub.org/blog/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/opensensorhub/osh-js',
          label: 'GitHub',
          position: 'left',
        },
        {
          to: 'http://opensensorhub.github.io/osh-js/v2.0.0/showcase/',
          label: 'Samples',
        },
        {href: 'http://opensensorhub.github.io/osh-js/v2.0.0/documentation/jsdoc', label: 'API', position: 'left'},
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://opensensorhub.org/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
