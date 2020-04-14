import React from 'react'
import './styles.css'

import Label from './Label'

function LabelsRow (props) {
    const labelClickHandler = (labelName) => {
        if (props.labelClicked) return props.labelClicked(labelName)
    }
    const isLabelActive = (label) => {
        return props.activeLabels && props.activeLabels.find(item => item === label)
    }
    const labels = props.labels.map((label, index) => 
        <Label 
            clicked={labelClickHandler}
            labelName={label}
            key={`${label}-${index}`}
            isActive={isLabelActive(label)}
        />
    )

    return (
        <div className={`labels-row ${ props.className ? props.className : '' }`}>
            { labels }
        </div>
    )
}

export default LabelsRow