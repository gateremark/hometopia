// import Moment from "react-moment"
import moment from "moment";
import { Link } from "react-router-dom";
import { MdLocationPin, MdEdit, MdDelete } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

const ListingItem = ({ listing, id, onEdit, onDelete }) => {
	const realTime = listing.timestamp;
	const date = realTime.toDate();
	return (
		<li className="relative bg-[#e2e2e2] flex flex-col justify-between item-center shadow-lg hover:shadow-xl rounded overflow-hidden transition-shadow duration-150 mx-[10px] mb-4">
			<Link className="contents" to={`/category/${listing.type}/${id}`}>
				<img
					className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
					loading="lazy"
					src={listing.imgUrls[0]}
					alt={listing.name}
				/>

				{/* <Moment fromNow>{listing.timestamp?.toDate()}</Moment> */}
				{/* <Moment>1976-04-19T12:59-0500</Moment> */}
				<p className="absolute top-2 left-2 bg-[#10192D] text-[#e2e2e2] uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
					{moment(date).fromNow()}
				</p>
				<div className="w-full p-3 relative">
					<div className="flex items-center gap-1">
						<MdLocationPin className="h-4 w-4 text-[#10192D]" />
						<p className="font-semibold text-sm mb-[2px] text-[#202e3d]">
							{listing.address}
						</p>
					</div>
					<p className=" font-semibold m-o text-xl text-[#002470] truncate">
						{listing.name}
					</p>
					<p className="text-[#457b9d] mt-2 font-semibold">
						Ksh{" "}
						{listing.offer
							? listing.discount
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: listing.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						{listing.type === "rent" && " /month"}
					</p>

					<div className="flex items-center mt-2 gap-4">
						<div className="flex items-center gap-1">
							<FaBed />
							<p className="font-bold text-sm">
								{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
							</p>
						</div>
						<div className="flex items-center gap-1">
							<FaBath />
							<p className="font-bold text-sm">
								{listing.restrooms > 1
									? `${listing.restrooms} Rests`
									: "1 Rest"}
							</p>
						</div>
					</div>
				</div>
			</Link>
			<div className="absolute right-1 bottom-3">
				<div className="flex gap-1">
					{onEdit && (
						<MdEdit
							className="text-[#081c47] z-30"
							onClick={() => onEdit(listing.id)}
						/>
					)}
					{onEdit && (
						<MdDelete
							className="text-[#5a0909] z-30"
							onClick={() => onDelete(listing.id)}
						/>
					)}
				</div>
			</div>
		</li>
	);
};

export default ListingItem;
