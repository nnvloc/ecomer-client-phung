import React, {memo} from 'react';
import './styles.css';

const LoadingComp = ({loading = false, ...props}) => {
  return loading ? (
      <div className="loading-wrapper">
        <div className="loader" />
      </div>
    ) : null;
}

export default memo(LoadingComp);
