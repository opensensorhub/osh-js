module.exports = {
  title: 'OpenSensorHub Web Client Toolkit',
  tagline: 'OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'OpenSensorHub', // Usually your GitHub org/user name.
  projectName: 'osh.js', // Usually your repo name.
  themeConfig: {
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
        {
          to: 'http://opensensorhub.github.io/osh-js/v2.0.0/showcase/',
          label: 'Samples',
        },
        {href: 'https://opensensorhub.org/blog/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/opensensorhub/osh-js',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/opensensorhub/osh-js',
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
