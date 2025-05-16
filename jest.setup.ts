import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import fetch, { Response, Request, Headers } from "node-fetch";
import { ReadableStream, TransformStream, WritableStream } from "stream/web";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
global.fetch = fetch as any;
global.Response = Response as any;
global.Request = Request as any;
global.Headers = Headers as any;
global.ReadableStream = ReadableStream as any;
global.TransformStream = TransformStream as any;
global.WritableStream = WritableStream as any;
