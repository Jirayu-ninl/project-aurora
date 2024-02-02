export default function IconPresent({
  fill = '#FFF',
  className,
}: {
  fill?: string
  className: string
}) {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='26.933'
        height='31.532'
        viewBox='0 0 26.933 31.532'
        className={className && className}
      >
        <path
          d='M28.609,18.393H15.471a.657.657,0,0,1,0-1.314H28.609a.657.657,0,1,1,0,1.314Zm-1.971,7.883h-9.2a.659.659,0,0,1-.657-.657V17.736a.659.659,0,0,1,.657-.657h9.2a.659.659,0,0,1,.657.657v7.883A.659.659,0,0,1,26.638,26.276ZM18.1,24.961h7.883V18.392H18.1ZM24.667,30.3a.661.661,0,0,1-.519-.252l-2.11-2.7-2.11,2.7a.657.657,0,1,1-1.035-.809l2.628-3.367a.677.677,0,0,1,1.034,0l2.628,3.367a.657.657,0,0,1-.516,1.061Zm-9.2,1.231H2.99a.658.658,0,0,1-.657-.657V7.99A.658.658,0,0,1,2.5,7.552L9.069.219A.66.66,0,0,1,9.558,0H25.324a.658.658,0,0,1,.657.657V14.451a.657.657,0,1,1-1.314,0V1.313H9.852L3.645,8.241V30.217H15.469a.657.657,0,1,1,0,1.314ZM9.559,9.2H3.647a.657.657,0,1,1,0-1.314H8.9V1.312a.657.657,0,1,1,1.314,0V8.538a.658.658,0,0,1-.657.657Z'
          transform='translate(-2.333 0.001)'
          fill={fill}
        />
      </svg>
    </>
  )
}