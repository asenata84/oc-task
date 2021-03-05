import { useEffect, useState } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import NotFound from './Components/NotFound';

import content from './assets/content.json';
import './App.css';

const App = (props) => {
  const { location } = props;
  const { pathname } = location;
  const [active, setActive] = useState(pathname);
  const classes = ['App-link'];

  useEffect(() => {
    if (active !== pathname) {
      setActive(pathname);
    }
  }, [pathname, active]);

  return (
    <div className='App'>
      <nav>
        <Link
          className={[...classes, active === '/' ? 'active' : '']
            .join(' ')
            .trim()}
          to='/'
        >
          Начало
        </Link>

        {content?.page?.map((item, index) => (
          <Link
            className={[
              ...classes,
              active === Object.keys(item)[0] ? 'active' : '',
            ]
              .join(' ')
              .trim()}
            key={`link-${Object.keys(item)[0]}`}
            to={Object.keys(item)[0]}
          >
            {item[Object.keys(item)[0]]?.title}
          </Link>
        ))}
      </nav>

      <Switch>
        <Route exact path='/'>
          <h1>Начало</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </Route>

        {content?.page?.map((item, index) => (
          <Route key={item[Object.keys(item)[0]]} exact path={Object.keys(item)[0]}>
            <h1>{item[Object.keys(item)[0]]?.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: item[Object.keys(item)[0]]?.content,
              }}
            />
          </Route>
        ))}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);
