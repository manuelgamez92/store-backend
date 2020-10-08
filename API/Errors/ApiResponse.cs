using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
              400 => "Error, please try again",
              401 => "The password is incorrect, please try again",
              404 => "Resource found,it was not",
              500 => "Errors are the path to the dark side",
              _ => null
            };
        }



    }
}