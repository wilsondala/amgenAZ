// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageInConstructionForm from './PageInConstructionForm';
import AnimatedView from '../../components/animatedView/AnimatedView';

class PageInConstructionFormHandler extends PureComponent {

    static propTypes = {
        // react-router 4
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        // views
        currentView: PropTypes.string.isRequired,
        enterPageInConstruction: PropTypes.func.isRequired,
        leavePageInConstruction: PropTypes.func.isRequired,
       
    }

    componentDidMount() {
        const { enterPageInConstruction } = this.props;
        enterPageInConstruction();
    }

    componentWillUnmount() {
        const { leavePageInConstruction } = this.props;
        leavePageInConstruction();
    }

    

    render() {
        return (
            <AnimatedView>
                <div style={{ minHeight: '60vh'}} className="uk-container uk-container-center uk-position-center ">
                    <h1 className="uk-h1 uk-margin-top uk-text-center uk-position-center">Página em construção.
                    <br />
                    <h1 className="uk-position-center fa fa-cog fa-1x fa-spin" ></h1></h1>
                 
                </div>
            </AnimatedView>
        );
    }
}

export default PageInConstructionFormHandler;
