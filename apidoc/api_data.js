define({ "api": [
  {
    "type": "get",
    "url": "/api/event/count/by-user",
    "title": "number of total of all event by current user",
    "version": "1.0.0",
    "group": "Count",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count retrivied\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Count",
    "name": "GetApiEventCountByUser"
  },
  {
    "type": "get",
    "url": "/api/event/count/all",
    "title": "number of total of all event",
    "version": "1.0.0",
    "group": "Count_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count retrivied\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Count_Admin_",
    "name": "GetApiEventCountAll"
  },
  {
    "type": "get",
    "url": "/api/user/count/admin",
    "title": "number of total admin users",
    "version": "1.0.0",
    "group": "Count_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count retrivied\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "Count_Admin_",
    "name": "GetApiUserCountAdmin"
  },
  {
    "type": "get",
    "url": "/api/user/count/user",
    "title": "number of total normal users",
    "version": "1.0.0",
    "group": "Count_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Count retrivied\",\n           \"status\": 200,\n           \"data\": \"number\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "Count_Admin_",
    "name": "GetApiUserCountUser"
  },
  {
    "type": "get",
    "url": "/api/event/all",
    "title": "Get all events",
    "version": "1.0.0",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All events listed successfully\",\n           \"status\": 200,\n           \"data\": [{\n                       \"end\": \"Date\",\n                       \"endTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"color\": \"string\",\n                       \"modifiedOn\": \"Date\",\n                       \"eventId\": \"string\",\n                       \"title\": \"string\",\n                       \"start\": \"Date\",\n                       \"startTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"userId\": \"string\",\n                       \"createdOn\": \"Date\"\n                   }]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Event",
    "name": "GetApiEventAll"
  },
  {
    "type": "get",
    "url": "/api/event/all/:userId",
    "title": "Get all events for a particular user",
    "version": "1.0.0",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user as parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All events listed for the user\",\n           \"status\": 200,\n           \"data\": [{\n                       \"end\": \"Date\",\n                       \"endTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"color\": \"string\",\n                       \"modifiedOn\": \"Date\",\n                       \"eventId\": \"string\",\n                       \"title\": \"string\",\n                       \"start\": \"Date\",\n                       \"startTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"userId\": \"string\",\n                       \"createdOn\": \"Date\"\n                   }]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Event",
    "name": "GetApiEventAllUserid"
  },
  {
    "type": "get",
    "url": "/api/event/:eventId",
    "title": "Get single event",
    "version": "1.0.0",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>eventId as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Event retrieved successfully\",\n           \"status\": 200,\n           \"data\": {\n                       \"end\": \"Date\",\n                       \"endTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"color\": \"string\",\n                       \"modifiedOn\": \"Date\",\n                       \"eventId\": \"string\",\n                       \"title\": \"string\",\n                       \"start\": \"Date\",\n                       \"startTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"userId\": \"string\",\n                       \"createdOn\": \"Date\"\n                   }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Event",
    "name": "GetApiEventEventid"
  },
  {
    "type": "post",
    "url": "/api/event/create",
    "title": "Create event",
    "version": "1.0.0",
    "group": "Event_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>start as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end",
            "description": "<p>end as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "startTime",
            "description": "<p>startTime as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "endTime",
            "description": "<p>endTime as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user to assign event as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>color code in hexadecimal form(#000000) as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Event created succesfully\",\n           \"status\": 201,\n           \"data\": {\n                       \"end\": \"Date\",\n                       \"endTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"color\": \"string\",\n                       \"modifiedOn\": \"Date\",\n                       \"eventId\": \"string\",\n                       \"title\": \"string\",\n                       \"start\": \"Date\",\n                       \"startTime\": {\n                           \"hour\": \"number\",\n                           \"minute\": \"number\",\n                           \"second\": \"number\"\n                       },\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"userId\": \"string\",\n                       \"createdOn\": \"Date\"\n                   }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Event_Admin_",
    "name": "PostApiEventCreate"
  },
  {
    "type": "post",
    "url": "/api/event/delete/:eventId",
    "title": "Delete Single event by eventId",
    "version": "1.0.0",
    "group": "Event_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventId",
            "description": "<p>pass eventId in URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Event was deleted successfully as per request\",\n           \"status\": 201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Event_Admin_",
    "name": "PostApiEventDeleteEventid"
  },
  {
    "type": "put",
    "url": "/api/event/edit/:eventId",
    "title": "Edit event",
    "version": "1.0.0",
    "group": "Event_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start",
            "description": "<p>start as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end",
            "description": "<p>end as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "startTime",
            "description": "<p>startTime as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "endTime",
            "description": "<p>endTime as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of user to assign event as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>color code in hexadecimal form(#000000) as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"The event was updated successfully!\",\n           \"status\": 201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 404/500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/eventRoute.js",
    "groupTitle": "Event_Admin_",
    "name": "PutApiEventEditEventid"
  },
  {
    "type": "get",
    "url": "/api/user/:userId",
    "title": "Retrieve Single User by userId",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass userId in URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User details found\",\n           \"status\": 200,\n           \"data\": {\n                   \"lastName\": \"string\",\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"fullName\": \"string\",\n                   \"username\": \"string\",\n                   \"title\": \"string\",\n                   \"email\": \"string\",\n                   \"country\": \"string\",\n                   \"mobileNumber\": \"string\",\n                   \"isAdmin\": \"boolean\"\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "GetApiUserUserid"
  },
  {
    "type": "post",
    "url": "/api/user/check/username",
    "title": "Check if username already taken",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>as Body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"The username you entered is available\",\n           \"status\": 200,\n           \"data\": \"null\"\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"The username you enetered is already taken/Error Occured\",\n\t    \"status\": 401/500\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "PostApiUserCheckUsername"
  },
  {
    "type": "post",
    "url": "/api/user/create",
    "title": "SignUp User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "telcode",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"\"User created and auth token generated Successfully\",\n       \"status\": 201,\n       \"data\": {   authToken: \"string\",\n                   userId: \"string\",\n                   expiresIn: \"number\",\n                   userDetails:{\n                       \"lastName\": \"string\",\n                       \"userId\": \"string\",\n                       \"firstName\": \"string\",\n                       \"fullName\": \"string\",\n                       \"username\": \"string\",\n                       \"title\": \"string\",\n                       \"email\": \"string\",\n                       \"country\": \"string\",\n                       \"mobileNumber\": \"string\",\n                       \"isAdmin\": \"boolean\"\n                   }\n           \n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "PostApiUserCreate"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Login User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"\"User created and auth token generated Successfully\",\n       \"status\": 201,\n       \"data\": {   authToken: \"string\",\n                   userId: \"string\",\n                   expiresIn: \"number\",\n                   userDetails:{\n                       \"lastName\": \"string\",\n                       \"userId\": \"string\",\n                       \"firstName\": \"string\",\n                       \"fullName\": \"string\",\n                       \"username\": \"string\",\n                       \"title\": \"string\",\n                       \"email\": \"string\",\n                       \"country\": \"string\",\n                       \"mobileNumber\": \"string\",\n                       \"isAdmin\": \"boolean\"\n                   }\n           \n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "PostApiUserLogin"
  },
  {
    "type": "post",
    "url": "/api/user/logout",
    "title": "Logout User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User logged out successfully\",\n           \"status\": 201,\n           \"data\": \"null\"\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "PostApiUserLogout"
  },
  {
    "type": "post",
    "url": "/api/user/recover/password",
    "title": "To generate email to reset password",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>as Body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Please click on the link in your registered email, do check your spam if not in inbox.\",\n           \"status\": 201,\n           \"data\": \"null(email will be sent your registered email address with link to reset password)\"\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 404/500\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "PostApiUserRecoverPassword"
  },
  {
    "type": "post",
    "url": "/api/user/reset/password/:authToken",
    "title": "To reset your password",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>as URL parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>as Body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Password was successfully reset, please login to continue\",\n           \"status\": 201,\n           \"data\": \"null\"\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 404/500\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User",
    "name": "PostApiUserResetPasswordAuthtoken"
  },
  {
    "type": "get",
    "url": "/api/user/all",
    "title": "Retrieve All User",
    "version": "1.0.0",
    "group": "User_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All users listed\",\n           \"status\": 200,\n           \"data\": [{\n                   \"lastName\": \"string\",\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"fullName\": \"string\",\n                   \"username\": \"string\",\n                   \"title\": \"string\",\n                   \"email\": \"string\",\n                   \"country\": \"string\",\n                   \"mobileNumber\": \"string\",\n                   \"isAdmin\": \"boolean\"\n               }]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User_Admin_",
    "name": "GetApiUserAll"
  },
  {
    "type": "get",
    "url": "/api/user/all/admin",
    "title": "Retrieve All Admin User",
    "version": "1.0.0",
    "group": "User_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All admin users listed\",\n           \"status\": 200,\n           \"data\": [{\n                   \"lastName\": \"string\",\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"fullName\": \"string\",\n                   \"username\": \"string\",\n                   \"title\": \"string\",\n                   \"email\": \"string\",\n                   \"country\": \"string\",\n                   \"mobileNumber\": \"string\",\n                   \"isAdmin\": \"boolean\"\n               }]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User_Admin_",
    "name": "GetApiUserAllAdmin"
  },
  {
    "type": "get",
    "url": "/api/user/all/normal",
    "title": "Retrieve All Normal User",
    "version": "1.0.0",
    "group": "User_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All normal users listed\",\n           \"status\": 200,\n           \"data\": [{\n                   \"lastName\": \"string\",\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"fullName\": \"string\",\n                   \"username\": \"string\",\n                   \"title\": \"string\",\n                   \"email\": \"string\",\n                   \"country\": \"string\",\n                   \"mobileNumber\": \"string\",\n                   \"isAdmin\": \"boolean\"\n               }]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User_Admin_",
    "name": "GetApiUserAllNormal"
  },
  {
    "type": "get",
    "url": "/api/user/delete/:userId",
    "title": "Delete Single User by userId",
    "version": "1.0.0",
    "group": "User_Admin_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>pass userId in URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User and auth associated with the user removed successfully\",\n           \"status\": 201,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userRoute.js",
    "groupTitle": "User_Admin_",
    "name": "GetApiUserDeleteUserid"
  }
] });
