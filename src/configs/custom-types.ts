export interface IToken {
  type: string
  accessToken: string
  refreshToken: string
}

export interface ITokenPayload {}

export enum EBizModel {
  FREEMIUM,
  IAP,
  PREMIUM
}

export type TCalculator = 'calculator' | 'currency'

export type TButton =
  | 'number'
  | 'percent'
  | 'dot'
  | 'bracket'
  | 'opposite'
  | 'operator'
  | 'ac'
  | 'backspace'
  | 'equal'
export interface IButton {
  symbol: any
  value: string
  type: TButton
  containerStyle: any
  contentStyle: any
}

export type TItem =
  | 'number'
  | 'percent'
  | 'dot'
  | 'bracket'
  | 'minusSign'
  | 'operator'
export interface IItem {
  symbol: any
  value: string
  type: TItem
}

export type TResultStatus = 'good' | 'infinity' | 'error'
export interface IResult {
  value: number
  status: TResultStatus
}

export type TCalcStatus = 'start' | 'inputing' | 'calculated'

export interface ICurrency {
  code: string
  currency: string
  rate: number
  icon: string
}

export interface IRecordCalculator {
  formula: IItem[]
  result: IResult
  timestamp: number
}

export interface IRecordCurrency {
  formula: IItem[]
  src: {
    currency: ICurrency
    result: IResult
  }
  des: {
    currency: ICurrency
    result: IResult
  }
  timestamp: number
}
