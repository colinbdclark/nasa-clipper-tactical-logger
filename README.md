# NASA Clipper Tactical Wind Sensor Logger

This repository contains a simple Node.js script to print out the non-compliant NMEA 0183 sentences sent from a NASA Clipper Tactical Wind masthead sensor.

## Details

It appears that the NASA Clipper Tactical masthead unit sends data that does not comply with the NMEA 0183 specification. In particular, it appears to terminate sentences with the <code>< LF >< NULL ></code> (i.e. <code>[0x0d, 0x00]</code>) byte sequence, whereas I believe most NMEA 0183 parsers expect <code>< CR >< LF ></code> as the sentence terminator.

I don't have access to the standard, but a number of sources suggest that <code>< CR >< LF ></code> is expected as the line terminator.

> Sentences are terminated by a <code>< CR >< LF ></code> sequence.
http://www.catb.org/gpsd/NMEA.html#_nmea_encoding_conventions
http://www.catb.org/gpsd/NMEA.html#_mwv_wind_speed_and_angle

> Each sentence starts with a "$" sign and ends with CRLF.
http://freenmea.net/docs

## Open Source NMEA Parser Implementations

The following open source NMEA parser implementations seem unable to handle the Clipper Tactical's nonstandard sentence terminators, and expect to receive <code>< CR >< LF ></code>:

 * [OpenCPN](https://github.com/OpenCPN/OpenCPN/blob/5a20bd502cfbe8ab8fc084126b17d90c6ec8df15/src/datastream.cpp#L555)
 * [vYacht](https://github.com/vyacht/stm32/blob/master/vynmea/nmea0183.c#L150-L162)

## Running the Logger

This code assumes you have [Node.js and npm](https://nodejs.org) installed. To built and run the code, run:

    npm install
    node .
