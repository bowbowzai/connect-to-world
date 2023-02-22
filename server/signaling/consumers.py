import json

from channels.generic.websocket import AsyncWebsocketConsumer


class CallConsumer(AsyncWebsocketConsumer):
    connected_users = []

    async def connect(self):
        await self.accept()
        # self.room_name = "test_room"
        # await self.send({"action": "your_channel_name", "message": self.channel_name})
        # await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        # await self.channel_layer.group_discard(self.room_name, self.channel_name)
        # print("disconnected")
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        eventType = text_data_json["type"]
        if eventType == "login":
            name = text_data_json["data"]["name"]
            self.my_name = name
            await self.channel_layer.group_add(self.my_name, self.channel_name)
        if eventType == "call":
            name = text_data_json["data"]["name"]
            print(f"{self.my_name} is calling {name}")
            await self.channel_layer.group_send(
                name,
                {
                    "type": "call.received",
                    "data": {
                        "caller": self.my_name,
                        "sdp": text_data_json["data"]["sdp"],
                    },
                },
            )
        if eventType == "answer_call":
            caller = text_data_json["data"]["name"]
            await self.channel_layer.group_send(
                caller,
                {
                    "type": "call.answered",
                    "data": {"sdp": text_data_json["data"]["sdp"]},
                },
            )
        if eventType == "ICEcandidate":
            callee = text_data_json["data"]["name"]
            print(text_data_json)
            await self.channel_layer.group_send(
                callee,
                {
                    "type": "ICEcandidate",
                    "data": {"candidate": text_data_json["data"]["iceCandidate"]},
                },
            )

    async def call_received(self, eventType):
        print("Call received by", self.my_name)
        await self.send(
            text_data=json.dumps({"type": "call_received", "data": eventType["data"]})
        )

    async def call_answered(self, eventType):
        print(f"{self.my_name} answered the call")
        await self.send(
            text_data=json.dumps({"type": "call_answered", "data": eventType["data"]})
        )

    async def ICEcandidate(self, eventType):
        await self.send(
            text_data=json.dumps({"type": "ICEcandidate", "data": eventType["data"]})
        )
