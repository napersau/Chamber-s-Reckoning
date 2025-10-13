package com.example.ChamberReckoning.service;

import com.example.ChamberReckoning.dto.request.AuthenticationRequest;
import com.example.ChamberReckoning.dto.request.IntrospectRequest;
import com.example.ChamberReckoning.dto.request.LogoutRequest;
import com.example.ChamberReckoning.dto.request.RefreshRequest;
import com.example.ChamberReckoning.dto.response.AuthenticationResponse;
import com.example.ChamberReckoning.dto.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);
    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;
    void logout(LogoutRequest request) throws ParseException, JOSEException;
    AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
}
