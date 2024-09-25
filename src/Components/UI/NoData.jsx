import nodata from '../../assets/no-data-2.svg'
import PropTypes from 'prop-types'
const NoData = ({message}) => {
  return (
      <>
          <div className='text-center my-4'>
              <img src={nodata} alt="No Data Svg" className='mx-auto bg-lighter px-20 w-[300px] pt-4 rounded-full' />
              <p className='mt-4 text-sub text-sm font-medium'>{message}</p>
      </div>
      </>
  )
}
NoData.propTypes = {
    message: PropTypes.string.isRequired
}
export default NoData