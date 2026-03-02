import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, description }) => {
    return (
        <div className="page-header">
            <div className="page-header-container container">
                <div className="page-header-content reveal">
                    {subtitle && <span className="page-subtitle">{subtitle}</span>}
                    <h1 className="page-title">{title}</h1>
                    {description && <p className="page-description">{description}</p>}
                </div>
            </div>
            <div className="page-header-decoration"></div>
        </div>
    );
};

export default PageHeader;
