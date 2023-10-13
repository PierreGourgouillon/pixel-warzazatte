import PixelModel from "./PixelModel"

export default interface DataResponse<T> {
    action: string
    data: T
}