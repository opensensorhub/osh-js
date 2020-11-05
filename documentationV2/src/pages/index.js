import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: 'Mixed data',
        imageUrl: 'img/data-map.jpeg',
        description: (
            <>
                Mix Video(H265, H264, VP9, VP8), Spectrogram, ImageDraping,
                Nexrad, any Swe generic(GPS, Quaternion, Weather temperature)..
            </>
        ),
    },
    {
        title: 'Data visualization',
        imageUrl: 'img/drone.jpeg',
        description: (
            <>
                Styling overlay using configurable stylers as well as an advanced support
                for video. It has been designed to integrate any map engines such as Lealfet, OpenLayer or Cesium.
            </>
        ),
    },
    {
        title: 'Synchronized Temporal & Real time playback',
        imageUrl: 'img/sync.jpeg',
        description: (
            <>
                Event based architecture suitable for real-time or playback with support of temporal
                synchronization on multiple data stream.
            </>
        ),
    },
    {
        title: 'Support for SOS & SPS',
        imageUrl: 'img/ogc.jpg',
        description: (
            <>
                Supports SWE JSON generic requests: GetCapabilities, GetFeatureOfInterest, GetResultTemplate, DescribeSensor
            </>
        ),
    },
    {
        title: 'Pure ES6 Javascript code & Vue.js components',
        imageUrl: 'img/technos.png',
        description: (
            <>
                Pure javascript framework with some extended high level frameworks/APIs:
                <ul>
                    <li>OpenLayers, Leaflet or Cesium for Map data</li>
                    <li>FFMPeg.js for Video Software decoding</li>
                    <li>Chart.js</li>
                </ul>
            </>
        ),
    },
    {
        title: 'Toolkit integration',
        imageUrl: 'img/vuejsreact.png',
        description: (
            <>
                Integrate the toolkit inside your App using pure JS code or Vue.js based components
            </>
        ),
    },
];

function Feature({imageUrl, title, description}) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title}/>
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors.<head />">
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <video loop muted autoPlay playsInline poster="images/bg.jpg"
                       className={clsx('video-bg')}>
                    <source src="img/bg.mp4" type="video/mp4"></source>
                </video>
                <div className="container fade-in-up animation-delay__0">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.containerButton}>
                        <div className={styles.buttons}>
                            <Link
                                className={clsx(
                                    'button button--outline button--lg button--fg --ifm-color-primary',
                                    styles.getStarted,
                                )}
                                to={useBaseUrl('docs/')}>
                                Get Started
                            </Link>
                        </div>
                        <div className={styles.buttons}>
                            <Link
                                className={clsx(
                                    'button button--outline button--lg button--fg --ifm-color-primary',
                                    styles.samples,
                                )}
                                to={useBaseUrl('http://opensensorhub.github.io/osh-js/v2.0.0/showcase/')}>
                                Samples
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}

export default Home;
