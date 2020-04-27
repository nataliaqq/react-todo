import React from 'react'
import './styles.css'

import Label from './Label'

interface LabelsRowProps {
    activeLabels: string[] | null
    labelClicked: (labelName: string) => void
    className: string
    labels: string[]
    key: number
}

function LabelsRow (props: LabelsRowProps) {
    const labelClickHandler = (labelName: string) => {
        if (props.labelClicked) return props.labelClicked(labelName)
    }
    const isLabelActive = (label: string) => {
        return !!props.activeLabels && !!props.activeLabels.find(item => item === label)
    }
    const labels = props.labels.map((label: string, index: number) => 
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