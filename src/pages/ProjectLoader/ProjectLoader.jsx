import React, { useContext } from 'react';
import styles from './ProjectLoader.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import OpenFolder from '../../components/OpenFolder/OpenFolderButton';
import { setProjectUrl, closeRightPanel } from '../../context/actions/globalActions';
import { loadProject, toggleFileDirectory } from '../../context/actions/globalActions';
require('dotenv').config();

const ProjectLoader = () => {
  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const addHttps = (url) => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    } else if (url.startsWith('localhost')) {
      url = 'http://' + url;
      return url;
    } else {
      url = 'https://' + url;
      return url;
    }
  };

  const handleChangeUrl = (e) => {
    const testSiteURL = addHttps(e.target.value);
    dispatchToGlobal(setProjectUrl(testSiteURL));
  };

  const handleChangeAbout = () => {
    dispatchToGlobal(loadProject('about'));
    dispatchToGlobal(closeRightPanel());
    if (isFileDirectoryOpen) dispatchToGlobal(toggleFileDirectory());
  };

  const placehold =
    process.env.NODE_ENV === 'development' ? 'Dev mode do not fill out' : 'ex: localhost:3000';

  return (
    <div id={styles.projectLoader}>
      <section id={styles.upperPart}>
        <span id={styles.title}>spearmint</span>
        <svg
          id={styles.leaf}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          >
          <path
            fill='#ffffff'
            d='M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z'
            />
        </svg>
        <span id={styles.purpose}>testing, simplified</span>
      </section>

      <section id={styles.lowerPart}>
        <div id={styles.appBox}>

          {/* Enter Starting URL */}
          {/* <div className={styles.contentBox}>
            <span className={styles.number}>01</span>
            <span className={styles.text}> Enter test site's URL</span> <br />
            <input type='text' autoFocus id={styles.url} placeholder={placehold} onChange={handleChangeUrl} />
          </div> */}
          
          {/* Open Project Directory */}
          <div className={styles.contentBox}>
            {/* <span className={styles.number}>02</span> */}
            <span className={styles.text}>Select your application</span> <br/>
            <OpenFolder />
          </div>
        </div>
        
        {/* Get started */}
        {/* <div id={styles.bottomDiv}>
          <button id={styles.helpBtn} onClick={handleChangeAbout}>
            <span className={styles.text}>Get Started</span>
          </button>
        </div> */}
      </section>
    </div>
  );
};

export default ProjectLoader;
