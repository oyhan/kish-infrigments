import { InputBase } from '@material-ui/core';
import React from 'react';
import useDriverStyles from './SearchDriverInputStyles'
import SearchIcon from '@material-ui/icons/Search';


export default function SearchDriverInput(props) {
  console.log('props: ', props);

  const classes = useDriverStyles();

    return (

        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="پلاک خودرو کد خودرو یا کد راننده..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={props }
            />
          </div>
    )
}


