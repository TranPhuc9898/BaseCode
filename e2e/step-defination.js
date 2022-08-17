const moment = require('moment')
const { device } = require('detox')
const { describe } = require('jest-circus')
require('isomorphic-fetch')
const urlServer = 'http://localhost:3000/api/'
const urlService = 'http://localhost:8080/api'

const callService = async (path, data) => {
  const result = await fetch(`${urlService}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {})
  })
  return result.json()
}

const initData = async (path, data) => {
  const result = await fetch(`${urlServer}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {})
  })
  return result.json()
}

const selectCountryCode = async (countryCode = '+84') => {
  await waitForElement('chooseCountryCode', 500)
  await tapId('chooseCountryCode')
  try {
    await tapId('chooseCountryCode')
  } catch (error) {}
  await tapId(`chooseCountryCode${countryCode}`)
}

const postTask = async (serviceId, address, description = 'My Task') => {
  let idAddress = null
  try {
    await tapId(serviceId)
  } catch (error) {
    await tapId('seeMoreService')
    await tapId(serviceId)
  }

  try {
    await tapText('Bắt đầu trải nghiệm')
  } catch (error) {}

  // Only choose address when a new user.
  const checkExist = await checkElementVisible('txtInputAddress')
  if (!checkExist) return null

  if (address === '500 Thanon Tanao') {
    await element(by.id('txtInputAddress')).typeText(address)
    // if (device.getPlatform() === 'android') {
    //   idAddress = '500 Thanon Tanao, Wat Bowon Niwet, Phra Nakhon, Vùng đô thị Bangkok, Thái Lan'
    // }else{
    idAddress =
      '500 Thanon Tanao, แขวง วัดบวรนิเวศ เขตพระนคร กรุงเทพมหานคร ประเทศไทย'
    // }
  } else {
    await element(by.id('txtInputAddress')).typeText('12 ' + address)
    idAddress =
      '12 Đường Phạm Văn Nghị, Tân Phong, Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
    if (address === 'Kim Ma, Ha Noi') {
      idAddress = '12 Kim Mã, Ba Đình, Hà Nội, Việt Nam'
    } else if (address === 'Bach Dang, Da Nang') {
      idAddress = '12 Bạch Đằng, Thạch Thang, Hải Châu, Đà Nẵng, Việt Nam'
    }
  }
  await waitForElement(idAddress, 3000, 'text')
  await tapText(idAddress)
  await tapId('btnSelectLocation')
  await typeToTextField('txtDescriptionMap', description)
  await tapText('Đồng ý')
  try {
    await tapId('iconCloseModal')
  } catch (error) {}
}

const chooseMarketAddress = async (address, description = 'My Task') => {
  let idAddress = null

  // Only choose address when a new user.
  // const checkExist = await checkElementVisible('btnAddress');
  //
  // if (!checkExist) return null;
  //
  try {
    await tapId('btnAddress')
  } catch (e) {}
  try {
    await tapId('inputAddress')
  } catch (e) {}

  if (address === '500 Thanon Tanao') {
    await element(by.id('txtInputAddress')).typeText(address)
    // if (device.getPlatform() === 'android') {
    //   idAddress = '500 Thanon Tanao, Wat Bowon Niwet, Phra Nakhon, Vùng đô thị Bangkok, Thái Lan'
    // }else{
    idAddress =
      '500 Thanon Tanao, Wat Bowon Niwet, Phra Nakhon, Vùng đô thị Bangkok, Thái Lan'
    // }
  } else {
    await element(by.id('txtInputAddress')).typeText('12 ' + address)
    idAddress =
      'Chợ Tân Mỹ, Đường Tân Mỹ, Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
    if (address === 'Kim Ma, Ha Noi') {
      idAddress = 'Kim Mã, Ba Đình, Hà Nội, Việt Nam'
    } else if (address === 'Bach Dang, Da Nang') {
      idAddress = 'Bạch Đằng, Hải Châu 1, Hải Châu, Đà Nẵng, Việt Nam'
    } else if (address === 'Đồng Khởi' || address === 'Dong Khoi') {
      idAddress =
        '12 Đồng Khởi, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam'
    } else if (address === 'lotter quan 9') {
      idAddress = 'Quận 9, Thành phố Hồ Chí Minh, Việt Nam'
    }
  }
  await waitForElement(idAddress, 3000, 'text')
  await tapText(idAddress)
  await tapId('btnSelectLocation')
}

// This step, handle login on modal login
const loginWithModal = async (phone, password = '123456', countryCode = '') => {
  // Click button login in modal login
  await waitForElement('modalBtnLogin', 500)
  await tapId('modalBtnLogin')

  // Login screens
  if (countryCode) {
    await waitForElement('chooseCountryCode', 500)
    await tapId('chooseCountryCode')
    await tapId(`chooseCountryCode${countryCode}`)
  } else {
    try {
      await waitForElement('+66', 1000, 'text')
      await selectCountryCode('+84')
    } catch (error) {}
  }
  await waitForElement('txtPhoneSignIn', 1000)
  await element(by.id('txtPhoneSignIn')).tap()
  await waitForElement('txtPhoneSignIn', 1000)
  await element(by.id('txtPhoneSignIn')).typeText(phone)
  await element(by.id('txtPasswordSigIn')).tap()
  await element(by.id('txtPasswordSigIn')).typeText(`${password}\n`)
  // if (device.getPlatform() === "ios") {
  await element(by.id('btnSignIn')).tap()
  // } else {
  //   await element(by.id('btnSignInAndroid')).tap();
  // }
  await waitForLoading(1000)
}

const loginWithPhoneAndPassword = async (phone, password, countryCode) => {
  // await device.reloadReactNative();

  // DON'T NEED BECAUSE AUTO LOGOUT WORKEDÍÍÍÍÍ
  // const account = await checkElementVisible('TÀI KHOẢN', 'text');
  // if (account) {
  //   await tapText('TÀI KHOẢN');
  //   await tapText('Cài đặt');
  //   await waitForElement('btnLogout', 500);
  //   await tapId('btnLogout');
  // }
  try {
    await waitForElement('cancelVerify', 1000)
    await tapId('cancelVerify')
  } catch (error) {}

  // const signInVisible = await checkElementVisible('homeHeaderBtnLogin');

  // User Not login
  try {
    // Choose country screen
    await tapId('lang_vi')
    await tapId('country_VN')
    await tapId('btnNext')

    // await waitForElement('Select service', 2000, 'text');
    await tapId('btnNextIntroPage')
    // await waitForElement('Task description', 500, 'text');
    await tapId('btnNextIntroPage')
    // await waitForElement('Confirm and finish', 500, 'text');
    await tapId('btnStartIntroPage')
  } catch (e) {}

  // Click login button in home screen and open modal
  await waitForElement('homeHeaderBtnLogin', 500)
  await tapId('homeHeaderBtnLogin')

  await loginWithModal(phone, password, countryCode)
}

// ========================== Tap Element ======================================

const typeToTextField = async (id, value) => {
  await element(by.id(id)).tap()
  await element(by.id(id)).typeText(value)
  // Tap to hide keyboard
  //   if (device.getPlatform() === 'ios') {
  //     await tapAtPoint(id, 0, -10)
  //   }
}

const typeToTextFieldSubmitKeyboard = async (id, value) => {
  await element(by.id(id)).tap()
  await element(by.id(id)).typeText(`${value}\n`)
}

const typeToTextFieldAtIndex = async (id, value, index = 0) => {
  await element(by.id(id)).atIndex(index).tap()
  await element(by.id(id)).atIndex(index).typeText(value)
}

const tapId = async id => {
  // if (device.getPlatform() === 'android') {
  //   await waitForElement(id, 1000);
  // }
  await element(by.id(id)).tap()
}

const tapIdAtIndex = async (id, index = 0) => {
  await element(by.id(id)).atIndex(index).tap()
}

const tapText = async text => {
  await waitForElement(text, 1000, 'text')
  await element(by.text(text)).tap()
}

const tapTextAtIndex = async (text, index = 0) => {
  await element(by.text(text)).atIndex(index).tap()
}

const tapAtPoint = async (id, x, y) => {
  await element(by.id(id)).tapAtPoint({ x, y })
}

const tapHeaderBack = async (index = 0) => {
  if (device.getPlatform() === 'ios') {
    try {
      await tapIdAtIndex('header-back', index)
    } catch (error) {
      await tapIdAtIndex('header-back', 1)
    }
  } else {
    await device.pressBack()
  }
}

const scrollTo = async (id, direction) => {
  // direction: 'top' or 'bottom'
  await element(by.id(id)).scrollTo(direction)
}

const scroll = async (
  id,
  pixels,
  direction,
  startPositionX = NaN,
  startPositionY = NaN
) => {
  // direction: 'up' or 'down'
  await element(by.id(id)).scroll(
    pixels,
    direction,
    startPositionX,
    startPositionY
  )
}

const swipe = async (id, direction, type) => {
  // direction: left/right/up/down
  if (type === 'text') {
    await element(by.text(id)).swipe(direction, 'fast', 0.9)
  } else {
    await element(by.id(id)).swipe(direction, 'fast', 0.9)
  }
}

const clearTextInput = async id => {
  const objElement = element(by.id(id))
  await objElement.tap()
  await objElement.clearText()
}

// ========================== Expect Element ===================================
const getTimeText = () => element(by.id('dateTimePicker'))
async function userOpensPicker({ mode, display, interval, tzOffsetPreset }) {
  await element(by.text(mode)).tap()
  await element(by.text(display)).tap()
  if (interval) {
    await element(by.text(String(interval))).tap()
  }
  if (tzOffsetPreset) {
    await element(by.id(tzOffsetPreset)).tap()
  }
  await element(by.id('dateTimePicker')).tap()
}

const getDateTimePickerControlIOS = () => element(by.type('dateTimePicker'))
const isIOS = () => device.getPlatform() === 'ios'

// ========================== Expect Element ===================================
const waitForElement = async (value, seconds, type) => {
  if (type === 'text') {
    await waitFor(element(by.text(value)))
      .toBeVisible()
      .withTimeout(seconds)
    await expectElementVisible(value, 'text')
  } else {
    await waitFor(element(by.id(value)))
      .toBeVisible()
      .withTimeout(seconds)
    await expectElementVisible(value)
  }
}

const waitForElementAtIndex = async (value, seconds, index = 0, type) => {
  if (type === 'text') {
    await waitFor(element(by.text(value)).atIndex(index))
      .toBeVisible()
      .withTimeout(seconds)
    await expectElementVisibleAtIndex(value, index, 'text')
  } else {
    await waitFor(element(by.id(value)).atIndex(index))
      .toBeVisible()
      .withTimeout(seconds)
    await expectElementVisibleAtIndex(value, index)
  }
}

const waitForLoading = async seconds => {
  try {
    await waitFor(element(by.id('appLoading')))
      .toBeVisible()
      .withTimeout(seconds)
  } catch (e) {}
}

//I should see text or id
const expectElementVisible = async (id, type) => {
  if (type === 'text') {
    await expect(element(by.text(id))).toBeVisible()
  } else {
    await expect(element(by.id(id))).toBeVisible()
  }
}

const expectElementVisibleAtIndex = async (id, index, type) => {
  if (type === 'text') {
    await expect(element(by.text(id)).atIndex(index)).toBeVisible()
  } else {
    await expect(element(by.id(id)).atIndex(index)).toBeVisible()
  }
}

const expectElementNotVisible = async (value, type) => {
  if (type === 'text') {
    await expect(element(by.text(value))).toBeNotVisible()
  } else {
    await expect(element(by.id(value))).toBeNotVisible()
  }
}

const expectElementNotExist = async (value, type) => {
  if (type === 'text') {
    await expect(element(by.text(value))).toNotExist()
  } else {
    await expect(element(by.id(value))).toNotExist()
  }
}

const expectIdToHaveText = async (id, text) => {
  await waitForElement(id, 500)
  await expect(element(by.id(id))).toHaveText(text)
}

const expectIdToHaveValue = async (id, value) => {
  await expect(element(by.id(id))).toHaveValue(value)
}

const checkElementVisible = async (id, type) => {
  try {
    await waitForElement(id, 2000, type)
    return true
  } catch (e) {
    return false
  }
}

const expectIdToHaveTextAtIndex = async (id, text, index) => {
  await expect(element(by.id(id)).atIndex(index)).toHaveText(text)
}

const expectIdToHaveValueAtIndex = async (id, value) => {
  await expect(element(by.id(id))).toHaveValue(value)
}

const typePromotionCode = async code => {
  await element(by.id('textInputPromotion')).tap()
  await element(by.id('textInputPromotion')).typeText(`${code}\n`)
  await waitForLoading(500)
}

/**
 *
 * @param hour hour want set [0-23]
 * @param hourDefault hour default when open post task step 2; 14h default, 8h for subscription
 */
const selectTime24h = async (hour, hourDefault = 14) => {
  if (device.getPlatform() === 'ios') {
    await waitForElement('dateTimePicker', 500)
    await tapId('dateTimePicker')
    await waitForElement('dateTimePicker', 500)
    const dp = element(by.id('dateTimePicker'))
    const hourTap = hour - hourDefault
    if (hourTap > 0) {
      // Tap the next time
      for (var i = 0; i < hourTap; i++) {
        await dp.tapAtPoint({ x: 220, y: 135 })
      }
    } else {
      // Tap the previous time
      for (var i = 0; i > hourTap; i--) {
        await dp.tapAtPoint({ x: 220, y: 90 })
      }
    }
  }
}

const selectTime = async (hour = 1, next = true, ampm) => {
  if (device.getPlatform() === 'ios') {
    await waitForElement('dateTimePicker', 500)
    await tapId('dateTimePicker')
    await waitForElement('dateTimePicker', 500)
    const dp = element(by.id('dateTimePicker'))
    if (hour) {
      if (next) {
        // Tap the next time
        for (var i = 0; i < hour; i++) {
          await dp.tapAtPoint({ x: 110, y: 135 })
        }
      } else {
        // Tap the previous time
        for (var i = 0; i < hour; i++) {
          await dp.tapAtPoint({ x: 110, y: 90 })
        }
      }
    }
    if (ampm) {
      if (ampm === 'AM') {
        await dp.tapAtPoint({ x: 220, y: 90 })
      } else {
        await dp.tapAtPoint({ x: 220, y: 125 })
      }
    }
  } else {
  }
}

const selectTimeAtIndex = async (hour = 1, next = true, ampm, index = 0) => {
  if (device.getPlatform() === 'ios') {
    await tapIdAtIndex('dpTimePicker', index)
    await waitForElement('dateTimePicker', 500)
    const dp = element(by.id('dateTimePicker'))
    if (hour) {
      if (next) {
        // Tap the next time
        for (var i = 0; i < hour; i++) {
          await dp.tapAtPoint({ x: 110, y: 135 })
        }
      } else {
        // Tap the previous time
        for (var i = 0; i < hour; i++) {
          await dp.tapAtPoint({ x: 110, y: 90 })
        }
      }
    }
    if (ampm) {
      if (ampm === 'AM') {
        await dp.tapAtPoint({ x: 220, y: 90 })
      } else {
        await dp.tapAtPoint({ x: 220, y: 125 })
      }
    }
  } else {
  }
}

const fillActiveCode = async (phone, countryCode) => {
  const data = await initData('user/getActivationCode', {
    phone: phone,
    countryCode: countryCode
  })
  const code = data.data.code
  await element(by.id('txtCode1')).typeText(code[0])
  await element(by.id('txtCode2')).typeText(code[1])
  await element(by.id('txtCode3')).typeText(code[2])
  await element(by.id('txtCode4')).typeText(code[3])
}

const typeToTextFieldDishName = async (numDish = 2) => {
  await waitForElement('dishDetail1', 500)
  for (var i = 1; i <= numDish; i++) {
    // await typeToTextField(`dishDetail${i}`, `Mon ${i}`);
    await element(by.id(`dishDetail${i}`)).tap()
    await element(by.id(`dishDetail${i}`)).typeText(`Mon ${i}`)
  }
  await element(by.id(`dishDetail${numDish}`)).typeText(`\n`)
}

const logout = async () => {
  await tapText('Cài đặt')
  await tapText('Đăng xuất')
}

const cancelTask = async ({ fee = '0', currency = '₫', promotion = false }) => {
  await swipe('scrollTaskDetail', 'up')
  await tapText('Thay đổi')
  await swipe('updatePage', 'up')
  await tapId('cancelTask')
  await tapText('Đồng ý')
  if (promotion) {
    await waitForElement(
      'Nếu bạn hủy công việc có tính phí, bạn sẽ không sử dụng được mã khuyến mãi nữa.',
      500,
      'text'
    )
    await tapText('Tiếp tục')
  }
  await tapText('Không cần công việc này nữa.')
  await tapText('Đồng ý')
  await expectElementVisible(
    `Bạn sẽ bị trừ phí nếu huỷ công việc này. Phí ước tính là ${fee} ${currency}. Bạn có chắc chắn muốn huỷ công việc này?`,
    'text'
  )
  await tapText('Đồng ý')
  await waitForElement(
    `Công việc đã được hủy. Phí: ${fee} ${currency}.`,
    500,
    'text'
  )
  await tapText('Đóng')
}

const houseKeepingPTCreateRoom = async (
  roomName = 'Full House',
  area = '50'
) => {
  // CREATE ROOM
  await tapText('Tạo phòng')
  await typeToTextField('roomName', roomName)
  await typeToTextField('roomArea', area)
  await tapId('btnCreateNewRoom')
  await waitForElement(
    'Tạo buồng phòng thành công. Bạn có thể đăng việc ngay bây giờ!',
    500,
    'text'
  )
  await tapText('Đăng việc ngay')
}

const postTaskElderlyCare = async (duration = 4) => {
  let price = '500'
  if (duration === 8) {
    price = '950'
  }
  await postTask('postTaskServiceELDERLY_CARE', 'Pham Van Nghi', 'My Task')
  try {
    await waitForElement('address1', 500)
    await tapId('address1')
  } catch (e) {}
  await tapId('btnChooseDay')
  await selectTime24h(10)
  await tapText('Đồng ý')
  await tapId(`chooseDuration-${duration}`)
  await expectIdToHaveText('lbPrice', `${price},000 VND/${duration}h`)
  await tapId('btnNextStep3')
  await typeToTextField(
    'taskNote',
    'Cham soc nguoi gia can than.\nTiem thuoc dung gio'
  )
  await tapId('taskNoteDescription')
  await tapText('Tiếp tục')
  await tapText('Đăng việc')
  await waitForElement('Theo dõi công việc', 500, 'text')
  await tapText('Theo dõi công việc')
}

const postTaskPatientCare = async (duration = 4) => {
  let price = '500'
  if (duration === 8) {
    price = '950'
  }
  await postTask('postTaskServicePATIENT_CARE', 'Pham Van Nghi', 'My Task')
  try {
    await waitForElement('address1', 500)
    await tapId('address1')
  } catch (e) {}
  await tapId('btnChooseDay')
  await tapId(`chooseDuration-${duration}`)
  await expectIdToHaveText('lbPrice', `${price},000 VND/${duration}h`)
  await tapId('btnNextStep3')
  await typeToTextField(
    'taskNote',
    'Cham soc nguoi gia can than.\nTiem thuoc dung gio'
  )
  await tapId('taskNoteDescription')
  await tapText('Tiếp tục')
  await tapText('Đăng việc')
  await waitForElement('Theo dõi công việc', 500, 'text')
  await tapText('Theo dõi công việc')
}

// Continue post task step 4
const signUpWithModal = async (
  name = 'name',
  phone = '0834567890',
  email = 'test@demo.com',
  countryCode
) => {
  try {
    await waitForElement('Select service', 2000, 'text')
    await tapId('btnNextIntroPage')
    await waitForElement('Task description', 500, 'text')
    await tapId('btnNextIntroPage')
    await waitForElement('Confirm and finish', 500, 'text')
    await tapId('btnStartIntroPage')

    // Choose country screen
    await waitForElement('btnChooseLanguage', 1000)
    await tapId('btnChooseLanguage')
    await tapId('vietnam')
    await tapId('countryvietnam')
  } catch (e) {}

  // Modal sign up
  await waitForElement('ModalBtnSignUp', 500)
  await tapId('ModalBtnSignUp')

  await typeToTextField('txtName', name)
  await typeToTextField('txtPhone', phone)
  await typeToTextField('txtEmail', email)
  await tapId('btnSignup')
  await waitForElement('Xác thực tài khoản', 1000, 'text')
  await initData('user/activationCodeExist', { phone: phone, countryCode })
  await fillActiveCode(phone, countryCode)
  await typeToTextField('txtPassword', '123456')
  try {
    await tapIdAtIndex('btnSavePassword', 0)
  } catch (e) {
    await tapIdAtIndex('btnSavePassword', 1)
  }
}

const forgotPasswordWithModal = async (phone, countryCode) => {
  // Modal sign up
  await waitForElement('modalBtnLogin', 500)
  await tapId('modalBtnLogin')

  // Check keyboard
  try {
    // await waitForElementAtIndex('signInBtnForgotPassword', 500, 0);
    await tapIdAtIndex('signInBtnForgotPassword', 0)
  } catch (e) {
    // await waitForElementAtIndex('signInBtnForgotPassword', 500, 1);
    await tapIdAtIndex('signInBtnForgotPassword', 1)
  }

  // Activation screen
  await typeToTextField('inputPhoneNumberForgotPass', phone)

  try {
    await tapIdAtIndex('nextButtonForgotPass', 0)
  } catch (e) {
    await tapIdAtIndex('nextButtonForgotPass', 1)
  }
  await waitForElement('Xác thực tài khoản', 1000, 'text')
  await initData('user/activationCodeExist', { phone: phone, countryCode })
  await fillActiveCode(phone, countryCode)

  // Type new password
  await typeToTextField('txtPassword', '123456')

  try {
    await tapIdAtIndex('btnSavePassword', 0)
  } catch (e) {
    await tapIdAtIndex('btnSavePassword', 1)
  }
}

const chooseIsoCodeFromSetting = async (isoCode = 'VN') => {
  await tapId('Tab_Account')
  await tapText('Cài đặt')
  await tapId('txtCountrySelected')
  await tapId(`btn${isoCode}`)
  try {
    await tapText('Đồng ý')
  } catch (error) {
    await tapHeaderBack()
    await tapId('Tab_Home')
  }
}

const chooseAddressGrocery = async () => {
  try {
    await waitForElement('address1', 500)
    await tapId('address1')
  } catch (e) {}

  // Choose grocery v3
  await tapId('groceryAssistantV3')

  // Choose store market
  await waitForElement('Big C', 500, 'text')
  await tapText('Big C')
}

const postTaskGroceryAssistant = async ({ isDepositMoney = true }) => {
  await postTask('postTaskServiceGO_MARKET', 'Pham Van Nghi')

  // Choose address
  await chooseAddressGrocery()
  await tapId('iconCloseModal')
  // add food to cart
  await tapId('add_Củ quả_Đào tươi (2 trái)')
  await expectIdToHaveText('cartQuantity', '1')

  // See cart
  await tapId('rightButtonCart')
  await waitForElement('Xem giỏ hàng', 500, 'text')
  await tapText('Tiếp tục')

  // Check price step 3
  if (isDepositMoney) {
    await waitForElement(
      'Đơn hàng này yêu cầu khách hàng đặt cọc 200,000 ₫ và thanh toán bằng bPay.',
      500,
      'text'
    )
    await tapText('Đồng ý')
  }

  await tapId('btnNextStep3')
  await tapId('btnNextNoteStep3')

  // Check price step 4
  await swipe('scrollViewStep4', 'up')

  // step4FeeBuy
  await tapText('Đăng việc')
  await waitForElement('Theo dõi công việc', 500, 'text')
  await tapText('Theo dõi công việc')
}

module.exports = {
  callService,
  initData,
  postTask,
  typeToTextField,
  typeToTextFieldAtIndex,
  tapId,
  tapIdAtIndex,
  tapText,
  tapTextAtIndex,
  tapAtPoint,
  tapHeaderBack,
  scrollTo,
  scroll,
  swipe,
  waitForElement,
  waitForElementAtIndex,
  waitForLoading,
  expectElementVisible,
  expectElementVisibleAtIndex,
  expectElementNotVisible,
  expectElementNotExist,
  expectIdToHaveText,
  expectIdToHaveValue,
  clearTextInput,
  checkElementVisible,
  loginWithPhoneAndPassword,
  expectIdToHaveTextAtIndex,
  expectIdToHaveValueAtIndex,
  typePromotionCode,
  selectTime,
  selectTime24h,
  selectTimeAtIndex,
  chooseMarketAddress,
  fillActiveCode,
  typeToTextFieldDishName,
  logout,
  typeToTextFieldSubmitKeyboard,
  cancelTask,
  houseKeepingPTCreateRoom,
  postTaskElderlyCare,
  postTaskPatientCare,
  loginWithModal,
  signUpWithModal,
  forgotPasswordWithModal,
  chooseIsoCodeFromSetting,
  chooseAddressGrocery,
  postTaskGroceryAssistant,
  getTimeText,
  isIOS,
  userOpensPicker,
  getDateTimePickerControlIOS
}
