import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  footer: {
    position: 'relative',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around'
  },
  listItem: {
    marginRight: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
});

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <ul className={classes.list}>
        <li className={classes.listItem}><Link to="/subscription" className={classes.link}>Подписка</Link></li>
        <li className={classes.listItem}><Link to="/advertise" className={classes.link}>Реклама на сайте</Link></li>
        <li className={classes.listItem}><Link to="/help" className={classes.link}>Помощь</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
