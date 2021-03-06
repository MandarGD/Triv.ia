import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const ChartTitle = (props) => {
    return ( 
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {props.children}
            </Typography>
        </>
     );
}

ChartTitle.propTypes = {
    children: PropTypes.node,
};
 
export default ChartTitle;