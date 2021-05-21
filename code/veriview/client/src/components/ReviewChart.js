import Chart from 'chart.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export default function CardLineChart({ reviewProofs }) {
  const GRAPH_DATE_FORMAT = 'MMM YYYY';

  /**
   * Creates an object with months as keys and their occurances as values.
   *
   * @param {Array} sortedReviews - e.g. [ {publisher: Springer, timestamp: 1552422...}, ...]
   * @returns {Object} - An object where keys are the MMM YYYY formatted months and values are number of reviews in that month.
   * { Jan 2020: 5, Dec 2019: 1, ... , Apr 2017: 2}
   */
  function countMonthlyReviews(reviews) {
    const monthsMap = {};
    reviews.forEach((review) => {
      const month = moment(review.issuanceDate).format(GRAPH_DATE_FORMAT);
      if (!Object.prototype.hasOwnProperty.call(monthsMap, month)) {
        // Assign month if encountered first time
        monthsMap[month] = 1;
      } else {
        monthsMap[month] += 1; // Increment otherwise.
      }
    });
    return monthsMap;
  }

  /**
   * Transforms an object into an array of objects to feed to the graph.
   *
   * @param {Object} monthsMap An object where keys are the MMM YYYY formatted months and values are number of reviews in that month. { Jan 2020: 5, Dec 2019: 1, ... , Apr 2017: 2}
   * @return {Array} - [{month: 'May 2019', count: 2 }, {month: 'Jan 2019', count: 3}...]
   */
  function formatMonthsMapToChart(monthsMap) {
    return Object.keys(monthsMap).map((mmmyyyy) => ({ month: mmmyyyy, count: monthsMap[mmmyyyy] }));
  }

  // Sort reviews first to have monthly review count object array sorted.
  function sortReviews(reviews) {
    return reviews.sort((review1, review2) => {
      if (moment(review1.issuanceDate).isBefore(review2.issuanceDate)) return -1;
      if (moment(review1.issuanceDate).isAfter(review2.issuanceDate)) return 1;
      return 0;
    });
  }

  /**
   *
   * @param {Object} monthsMap - monthsMap An object where keys are the MMM YYYY formatted months and values are number of reviews in that month. { Jan 2020: 5, Dec 2019: 1, ... , Apr 2017: 2}
   * @returns {Object} - monthsMap with all months from the very first review month until the most recent. Months with no reviews given the value 0.
   *  { Jan 2020: 5, Dec 2019: 1, Nov 2019: 0, ... , Mar 2017: 0, Apr 2017: 2}
   */
  function fillEmptyMonths(monthsMap, sortedReviews) {
    // console.log('Received months: ', monthsMap);

    if (sortedReviews.length === 1) return monthsMap;

    // Parse the first and last month
    const firstReviewDate = moment(sortedReviews[0].issuanceDate);
    const lastReviewDate = moment(sortedReviews[sortedReviews.length - 1].issuanceDate);

    // Iterate each month
    let currentReviewDate = firstReviewDate;
    const allMonthsMap = {};
    // Iterate from currentReviewMonth until lastReviewMonth
    while (moment(currentReviewDate).isSameOrBefore(lastReviewDate)) {
      const currentReviewMonth = currentReviewDate.format(GRAPH_DATE_FORMAT);
      // console.log('Current month is: ', currentReviewMonth);
      // If the month is empty
      if (!Object.prototype.hasOwnProperty.call(monthsMap, currentReviewMonth)) {
        allMonthsMap[currentReviewMonth] = 0;
      } else {
        allMonthsMap[currentReviewMonth] = monthsMap[currentReviewMonth];
      }
      // Check next month.
      currentReviewDate = moment(currentReviewDate).add(1, 'month');
    }
    const lastReviewMonth = lastReviewDate.format(GRAPH_DATE_FORMAT);
    // Assign last review month.
    allMonthsMap[lastReviewMonth] = monthsMap[lastReviewMonth];

    // console.log('Filled months: ', allMonthsMap);
    return allMonthsMap;
  }

  function monthlyGroupReviews(reviews) {
    if (reviews.length === 0) return [];
    const sortedReviews = sortReviews(reviews);
    const monthsMap = countMonthlyReviews(sortedReviews);
    const allMonthsMap = fillEmptyMonths(monthsMap, sortedReviews);
    const allMonthsArray = formatMonthsMapToChart(allMonthsMap);
    return allMonthsArray;
  }

  /**
   * Function to dynamically extract months to be shown on the yearly chart.
   *
   * @param {Array} allMonthsArray - Formatted array of all months with review counts.
   * @param {Number} yearsBefore - Years ago to be shown. E.g. if last review was in Mar 2019, yearsBefore = 0 gives 12 months from Apr 2018 to Mar 2019 inclusive. yearsBefore = 2 gives Apr 2016 to Mar 2017.
   * @returns {Array} - Array of 12 review objects with format [{month: 'Apr 2018' count:0}, ... , {month: 'Mar 2019', count: 3}].
   */
  function get12MonthsDataOfYearsBefore(allMonthsArray, yearsFromNow) {
    // console.log('All Months Array: ', allMonthsArray);
    // console.log('Years from now: ', yearsFromNow);
    const lastIndex = allMonthsArray.length - 1 - yearsFromNow * 12;
    const firstIndex = lastIndex - 11; // slice() is first inclusive
    // console.log('First index: ', firstIndex, ' Last Index: ', lastIndex);
    if (yearsFromNow < 0) return [];
    if (lastIndex < 0) return [];
    if (firstIndex < 0) return allMonthsArray.slice(0, lastIndex + 1);
    return allMonthsArray.slice(firstIndex, lastIndex + 1);
  }

  const [yearsFromNow, setYearsFromNow] = useState(0);
  const [chartData, setChartData] = useState([]);
  const allMonthsArray = monthlyGroupReviews(reviewProofs);

  useEffect(() => {
    const tempChartData = get12MonthsDataOfYearsBefore(allMonthsArray, yearsFromNow);
    setChartData(tempChartData);
  }, [yearsFromNow]);

  useEffect(() => {
    console.log('Chart data');
    console.log(chartData);

    const config = {
      type: 'bar',
      data: {
        labels: chartData.map((entry) => entry.month),
        datasets: [
          {
            backgroundColor: 'rgba(56, 189, 248, 1)',
            borderColor: 'rgba(56, 189, 248, 1)',
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'count',
            },
            data: chartData.map((entry) => entry.count),
            fill: false,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white',
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white',
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    const ctx = document.getElementById('line-chart').getContext('2d');
    window.myLine = new Chart(ctx, config);
    return () => {
      window.myLine.destroy();
    };
  }, [chartData]);

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700'>
        <div className='m-auto pt-4'>
          <PrevNextYear
            onClick={() => setYearsFromNow(yearsFromNow + 1)}
            // disable if prev 12 months retuns empty array. Even if there are no user reviews, a non-empty array is returned as long as in the range of the first and last review.
            disabled={get12MonthsDataOfYearsBefore(allMonthsArray, yearsFromNow + 1).length === 0}
          >
            Previous Year
          </PrevNextYear>
          <PrevNextYear onClick={() => setYearsFromNow(yearsFromNow - 1)} disabled={yearsFromNow === 0}>
            Next Year
          </PrevNextYear>
        </div>
        <div className='rounded-t mb-0 px-4 py-3 bg-transparent' />
        <div className='p-4 flex-auto'>
          {/* Chart */}
          <div className='relative h-350-px'>
            <canvas id='line-chart' />
          </div>
        </div>
      </div>
    </>
  );
}

const PrevNextYear = ({ onClick, disabled, children }) => (
  // avoid click function if disabled.
  <span
    onClick={disabled ? null : onClick}
    className={`cursor-pointer my-2 ${disabled ? 'text-gray-400' : 'text-lightBlue-400'} mx-4`}
  >
    {children}
  </span>
);
