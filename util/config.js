var environment = process.env.NODE_ENV || 'production';
var config = {
	production: {
		port         : 5004,
		env          : environment,
		secret       : 'siaf_0.0.1',
		dev          : false,
		apiRoute     : 'https://api-sil.datacont.com',
		sapServiceUrl: 'http://192.168.6.30:8000/INTEGRACIONES_DATACONT/services/',
		datacont     : {
			nombreFull   : 'Datacont S.A.C.',
			webServiceUrl: 'http://192.168.6.10/datacont-siaf/siaf-api.wso/',
			logo         : 'http://sil.datacont.com/static/logo.png',
			color        : '#b80813',
			webUrl       : 'http://sil.datacont.com',
			dominio      : 'datacont.com',
			samba				 : {
				cotizaciones : {
					share: '\\\\hermes\\cotizaciones',
					domain  : 'DATACONT',
					username: 'fmerizalde',
					password: 'rafoha#23'
				}
			},
			mail         : {
				recursos        : 'walejos@datacont.com',
				developer       : 'fbenavides@datacont.com',
				soporteComercial: 'soportecomercial@datacont.com ',
				aprobacionHojaRutaVentas : {
					canalesAlternativo: 'asc1@datacont.com',
					distribuidores    : 'asc2@datacont.com',
					ventasDirectas    : 'vverano@datacont.com'
				}
			},
			db: {
				object_connection: {
					user    : 'sa',
					password: 'kofexi-85',
					server  : '192.168.6.12',
					database: 'funns_datacont',
					port    : 1433,
					options : {
							encrypt: false,
							useUTC : false
					}
				}
			}
		},
		reprodata: {
			nombreFull   : 'Reprodata S.A.C.',
			webServiceUrl: 'http://192.168.6.10/reprodata-siaf/siaf-api.wso/',
			logo         : 'http://sil.reprodata.com.pe/static/logo.png',
			color        : '#e6007e',
			webUrl       : 'http://sil.reprodata.com.pe',
			dominio      : 'reprodata.com.pe',
			samba        : {
				cotizaciones : {
					share   : '\\\\srepro\\cotizaciones',
					domain  : 'REPRODATA',
					username: 'fmerizalde',
					password: 'rafoha#23'
				}
			},
			mail         : {
				recursos                : 'walejos@datacont.com',
				developer               : 'fbenavides@datacont.com',
				soporteComercial        : 'soportecomercial@reprodata.com.pe',
				aprobacionHojaRutaVentas: {
					ventasDirectas: 'lmendoza@reprodata.com.pe'
				}
			},
			db: {
				object_connection: {
					user    : 'sa',
					password: 'kofexi-85',
					server  : '192.168.6.12',
					database: 'funns_reprodata',
					port    : 1433,
					options : {
							encrypt: false,
							useUTC : false
					}
				}
			}
		}
	},
	development: {
		port    : 4000,
		env     : environment,
		dev     : true,
		secret  : 'selfservice2',
		apiRoute: 'http://localhost:3000',
		sapServiceUrl: 'http://192.168.6.30:8000/INTEGRACIONES_DATACONT/services/',
		datacont: {
			nombreFull   : 'Datacont S.A.C.',
			webServiceUrl: 'http://localhost/siaf-web-service/siaf-api.wso/',
			webUrl       : 'http://localhost:8080',
			color        : '#b80813',
			logo         : 'https://funns.datacont.com/static/logo.png',
			dominio      : 'datacont.com',
			samba        : {
				cotizaciones : {
					share   : '\\\\hermes\\cotizacionesprueba',
					domain  : 'DATACONT',
					username: 'fmerizalde',
					password: 'rafoha#23'
				}
			},
			mail         : {
				recursos                : 'walejos@datacont.com',
				developer               : 'fbenavides@datacont.com',
				soporteComercial        : 'mtorres@datacont.com',
				aprobacionHojaRutaVentas: {
					canalesAlternativo: 'asc1@datacont.com',
					distribuidores    : 'asc2@datacont.com',
					ventasDirectas    : 'vverano@datacont.com',
				}
			},
			db: {
				object_connection: {
					user    : 'sa',
					password: 'sql',
					server  : '192.168.6.236',
					database: 'funns_datacont',
					// port: 58282,
					options: {
							encrypt: false,
							useUTC : false
					}
				}
			},
			db_iso: {
				object_connection: {
					user    : 'sa',
					password: 'sql',
					server  : 'localhost',
					database: 'iso',
					// port: 58282,
					options: {
							encrypt: false,
							useUTC : false
					}
				}
			}
		},
		reprodata: {
			nombreFull   : 'Reprodata S.A.C.',
			webServiceUrl: 'http://localhost/siv-web-service/siv-api.wso/',
			webUrl       : 'http://localhost:8080',
			color        : '#e6007e',
			logo         : 'https://funns.reprodata.com.pe/static/logo.png',
			dominio      : 'reprodata.com.pe',
			samba				 : {
				cotizaciones : {
					share: '\\\\srepro\\cotizacionesprueba',
					domain  : 'REPRODATA',
					username: 'fmerizalde',
					password: 'rafoha#23'
				}
			},
			mail         : {
				developer       : 'fbenavides@datacont.com',
				soporteComercial: 'nalvarado@datacont.com',
				aprobacionHojaRutaVentas : {
					canalesAlternativo: 'asc1@reprodata.com.pe',
					distribuidores    : 'asc2@reprodata.com.pe',
					ventasDirectas    : 'vverano@reprodata.com.pe',
				}
			},
			db: {
				object_connection: {
					user    : 'sa',
					password: 'sql',
					server  : '192.168.6.236',
					database: 'funns_datacont',
					// port: 58282,
					options: {
							encrypt: false,
							useUTC : false
					}
				}
			},
		}
	}
};
module.exports = config[environment];