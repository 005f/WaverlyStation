import React from 'react'
import { shape } from 'prop-types'
import { FILTER_GRAPH_FREQ_RESOLUTION, FILTER_GRAPH_DB_RESOLUTION } from '../../constants'

import styles from './Filter.css'

// Converts to decibel
function getDBResponse(mag) {
  const resp = (20.0 * Math.log(mag)) / Math.LN10
  // Multiply by 2 as this is the response of 1 of 2 filters
  return resp * 2
}

function mapResponseToPoints(resp) {
  const zeroDBOffset = FILTER_GRAPH_DB_RESOLUTION - 50
  const points = []

  resp.forEach((value, i) => {
    points.push([
      i,
      FILTER_GRAPH_DB_RESOLUTION - zeroDBOffset - getDBResponse(value),
    ])
  })

  return points
}

export default function Filter({ response }) {
  return (
    <svg
      width={FILTER_GRAPH_FREQ_RESOLUTION}
      height={FILTER_GRAPH_DB_RESOLUTION}
      className={styles['filter-graph']}
    >
      <polyline
        fill="none"
        stroke="black"
        strokeWidth="3"
        points={mapResponseToPoints(response)}
      />
    </svg>
  )
}

Filter.propTypes = {
  response: shape({}).isRequired,
}
