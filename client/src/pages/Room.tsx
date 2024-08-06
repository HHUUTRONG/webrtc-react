import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";
import { RoomContext } from "../context/RoomContext";

export const Room = () => {
  const { id } = useParams();
  const { ws, me, peers, stream } = useContext(RoomContext);

  useEffect(() => {
    me?.on("open", () => {
      ws.emit("join-room", { roomId: id, peerId: me._id });
    });
  }, [id, me, ws]);

  return (
    <div className="p-4">
      <p>Room id {id}</p>
      <div className="grid grid-cols-6 gap-4">
        <VideoPlayer className="me h-60" key={"me"} stream={stream} />

        {Object.values(peers).map((peer: any) => (
          <VideoPlayer key={peer.id} stream={peer.stream} />
        ))}
      </div>
    </div>
  );
};
