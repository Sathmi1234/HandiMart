package com.handimart.app.response;

import java.time.LocalDateTime;

public class ErrorResponse {

	private int errorCode;
    private String errorMessage;
    private String errorStatus;
    private LocalDateTime timestamp;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(int errorCode, String errorMessage, String errorStatus) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorStatus = errorStatus;
        this.timestamp = LocalDateTime.now();
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorStatus() {
        return errorStatus;
    }

    public void setErrorStatus(String errorStatus) {
        this.errorStatus = errorStatus;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
